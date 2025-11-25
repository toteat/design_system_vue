import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import OverlayMessage from '../OverlayMessage.vue';
import Button from '../../Button/Button.vue';
import Icon from '../../Icon/Icon.vue';

const meta: Meta<typeof OverlayMessage> = {
  title: 'Components/OverlayMessage',
  component: OverlayMessage,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: { type: 'select' },
      options: ['success', 'info', 'warning', 'error'],
    },
  },
  args: {
    visible: false,
    dismissible: true,
    closeOnBackdrop: true,
    closeOnEsc: true,
  },
};

export default meta;
type Story = StoryObj<typeof OverlayMessage>;

export const Success: Story = {
  args: {
    status: 'success',
    eyebrow: 'Success',
    title: '¡Todo listo! Los datos se guardaron correctamente',
    primaryButtonLabel: 'Volver al inicio',
    secondaryButtonLabel: 'Revisar detalles',
  },
  render: (args) => ({
    components: { OverlayMessage, Button },
    setup() {
      const visible = ref(false);
      const open = () => {
        visible.value = true;
      };
      return { args, visible, open };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <Button text="Mostrar overlay" variant="primary" @click="open" />
        <OverlayMessage v-bind="args" v-model:visible="visible">
          <p>
            Si necesitas modificar algo más tarde, puedes volver a este flujo desde tu panel principal.
          </p>
        </OverlayMessage>
      </div>
    `,
  }),
};

export const Warning: Story = {
  args: {
    status: 'warning',
    eyebrow: 'Revisa antes de continuar',
    title: 'Hay información pendiente por completar',
    primaryButtonLabel: 'Completar ahora',
    secondaryButtonLabel: 'Guardar como borrador',
  },
  render: (args) => ({
    components: { OverlayMessage, Button },
    setup() {
      const visible = ref(false);
      const open = () => {
        visible.value = true;
      };
      return { args, visible, open };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <Button text="Mostrar overlay" variant="warning" @click="open" />
        <OverlayMessage v-bind="args" v-model:visible="visible">
          <p>
            Algunos campos obligatorios siguen vacíos. Puedes guardarlos como borrador, pero no se compartirán con tu equipo.
          </p>
        </OverlayMessage>
      </div>
    `,
  }),
};

export const CustomActions: Story = {
  render: () => ({
    components: { OverlayMessage, Button, Icon },
    setup() {
      const visible = ref(false);
      const close = () => {
        visible.value = false;
      };
      const open = () => {
        visible.value = true;
      };
      return { visible, close, open };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <Button text="Mostrar overlay" variant="primary" @click="open" />
        <OverlayMessage
          v-model:visible="visible"
          status="error"
          title="No pudimos generar el reporte"
          :dismissible="false"
          :close-on-backdrop="false"
        >
          <p>
            El servicio externo tardó demasiado en responder. Inténtalo nuevamente o descarga los datos en otro formato.
          </p>
          <template #icon>
            <Icon name="error-filled-red" :size="3" />
          </template>
          <template #actions="{ close }">
            <Button text="Intentar de nuevo" variant="primary" is-full @click="close" />
          </template>
        </OverlayMessage>
      </div>
    `,
  }),
};

export const Standalone: Story = {
  args: {
    visible: true,
    standalone: true,
    status: 'info',
    eyebrow: 'Resumen',
    title: 'Mensaje embebido sin overlay',
    primaryButtonLabel: 'Aceptar',
    secondaryButtonLabel: 'Cancelar',
    showCloseButton: true,
  },
  render: (args) => ({
    components: { OverlayMessage },
    setup() {
      return { args };
    },
    template: `
      <OverlayMessage v-bind="args">
        <p>
          Puedes incrustar esta tarjeta dentro de cualquier layout sin bloquear la interfaz completa.
        </p>
      </OverlayMessage>
    `,
  }),
};
