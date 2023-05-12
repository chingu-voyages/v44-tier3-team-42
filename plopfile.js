module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'reusable component',
    prompts: [
      {
        type: 'list',
        name: 'folder',
        message: 'choose a folder for this component',
        choices: ['common', 'ui'],
      },
      {
        type: 'input',
        name: 'name',
        message: 'enter the component name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{folder}}/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/comp.tsx',
      },
    ],
  });
  plop.setGenerator('service', {
    description: 'application service',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'service name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/services/{{name}}.ts',
        templateFile: 'plop-templates/service.ts',
      },
    ],
  });
  plop.setGenerator('spec', {
    description: 'cypress e2e spec',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'spec name please',
      },
      {
        type: 'number',
        name: 'id',
        message: 'enter suite id',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'cypress/e2e/{{id}}-{{name}}.cy.ts',
        templateFile: 'plop-templates/spec.cy.ts',
      },
    ],
  });
};
