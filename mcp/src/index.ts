#!/usr/bin/env node
import { createServer } from 'node:http';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { registerResources } from './resources/index.js';
import { registerTools } from './tools/index.js';

function createMcpServer(): McpServer {
  const server = new McpServer({
    name: 'toteat-design-system',
    version: '1.0.0',
  });
  registerResources(server);
  registerTools(server);
  return server;
}

const args = process.argv.slice(2);
const isHttp = args.includes('--http');
const portIndex = args.indexOf('--port');
const parsedPort = portIndex !== -1 ? parseInt(args[portIndex + 1], 10) : 3333;
if (portIndex !== -1 && Number.isNaN(parsedPort)) {
  process.stderr.write(
    `Warning: invalid --port value "${args[portIndex + 1]}", defaulting to 3333\n`,
  );
}
const port = Number.isNaN(parsedPort) ? 3333 : parsedPort;

if (isHttp) {
  const httpServer = createServer(async (req, res) => {
    if (req.url !== '/mcp') {
      res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found');
      return;
    }

    try {
      const chunks: Buffer[] = [];
      for await (const chunk of req) chunks.push(chunk as Buffer);
      const rawBody = Buffer.concat(chunks).toString();

      let body: unknown;
      try {
        body = rawBody.length > 0 ? JSON.parse(rawBody) : undefined;
      } catch {
        if (!res.headersSent) {
          res.writeHead(400, { 'Content-Type': 'application/json' }).end(
            JSON.stringify({
              jsonrpc: '2.0',
              error: { code: -32700, message: 'Parse error: invalid JSON' },
              id: null,
            }),
          );
        }
        return;
      }

      const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined,
      });
      const server = createMcpServer();
      await server.connect(transport);
      await transport.handleRequest(req, res, body);
      res.on('finish', () => {
        Promise.resolve(server.close()).catch((err) => {
          process.stderr.write(`MCP server close error: ${err}\n`);
        });
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Internal server error';
      process.stderr.write(`MCP request error: ${message}\n`);
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'application/json' }).end(
          JSON.stringify({
            jsonrpc: '2.0',
            error: { code: -32603, message: 'Internal error' },
            id: null,
          }),
        );
      }
    }
  });

  httpServer.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      process.stderr.write(
        `Port ${port} is already in use. Choose a different port with --port.\n`,
      );
    } else {
      process.stderr.write(`HTTP server error: ${err.message}\n`);
    }
    process.exit(1);
  });

  httpServer.listen(port, '127.0.0.1', () => {
    process.stderr.write(
      `toteat-design-system MCP server running at http://127.0.0.1:${port}/mcp\n`,
    );
  });
} else {
  try {
    const server = createMcpServer();
    const transport = new StdioServerTransport();
    await server.connect(transport);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    process.stderr.write(`Failed to start MCP server (stdio): ${message}\n`);
    process.exit(1);
  }
}
