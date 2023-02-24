
export const swaggerJsDocConfig = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Intern Backend Project',
      version: '0.0.1',
      description:
        'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
      license: {
        name: 'Licensed Under MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'MDIT',
        url: 'https://moderndayit.com',
      },
    },
  },
  apis: ['./src/controllers/*/*{.ts,.js}'],
}
