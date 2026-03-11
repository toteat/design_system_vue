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
const port = portIndex !== -1 ? parseInt(args[portIndex + 1], 10) : 3333;

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
      const body = rawBody.length > 0 ? JSON.parse(rawBody) : undefined;

      const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined,
      });
      const server = createMcpServer();
      await server.connect(transport);
      await transport.handleRequest(req, res, body);
      res.on('finish', () => server.close());
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Internal server error';
      if (!res.headersSent) {
        res
          .writeHead(400, { 'Content-Type': 'application/json' })
          .end(
            JSON.stringify({
              jsonrpc: '2.0',
              error: { code: -32700, message },
              id: null,
            }),
          );
      }
    }
  });

  httpServer.listen(port, '127.0.0.1', () => {
    process.stderr.write(
      `toteat-design-system MCP server running at http://127.0.0.1:${port}/mcp\n`,
    );
  });
} else {
  const server = createMcpServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
