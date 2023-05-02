module.exports = function (plop) {
  plop.setGenerator('entities', {
    description: 'Create a new entity',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'what is the name of the entity?',
      },
    ],
    actions: [...entitiesCreations],
  })
  plop.setGenerator('useCases', {
    description: 'Create a new useCase',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'what is the name of the useCase ?',
      },
    ],
    actions: [...useCasesCreations],
  })
  plop.setGenerator('test', {
    description: 'Create a new test',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'what is the name of the file ?',
      },
      {
        type: 'input',
        name: 'entity',
        message: 'what is the name of the entity ?',
      },
      {
        type: 'input',
        name: 'layer',
        message: 'what is the name of the layer ?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/slices/{{camelCase entity}}/{{pascalCase layer}}/{{name}}.spec.ts',
        templateFile: './templates/test.spec.ts.hbs',
      },
    ],
  })
}

const useCasesCreations = [
  {
    type: 'add',
    path: '../src/slices/{{camelCase name}}/repositories/contracts/add{{pascalCase name}}Repository.ts',
    templateFile:
      './templates/repositories/contracts/addDomainRepository.ts.hbs',
  },
  {
    type: 'add',
    path: '../src/slices/{{camelCase name}}/repositories/contracts/load{{pascalCase name}}Repository.ts',
    templateFile:
      './templates/repositories/contracts/loadDomainRepository.ts.hbs',
  },
  {
    type: 'add',
    path: '../src/slices/{{camelCase name}}/repositories/contracts/index.ts',
    templateFile: './templates/repositories/contracts/index.ts.hbs',
  },
  {
    type: 'add',
    path: '../src/slices/{{camelCase name}}/useCases/add{{pascalCase name}}/Add{{pascalCase name}}.ts',
    templateFile: './templates/useCases/addDomain/addDomain.ts.hbs',
  },
  {
    type: 'add',
    path: '../src/slices/{{camelCase name}}/useCases/add{{pascalCase name}}/Add{{pascalCase name}}.spec.ts',
    templateFile: './templates/useCases/addDomain/addDomain.spec.ts.hbs',
  },
  {
    type: 'add',
    path: '../src/slices/{{camelCase name}}/useCases/add{{pascalCase name}}/index.ts',
    templateFile: './templates/useCases/addDomain/index.ts.hbs',
  },

  {
    type: 'add',
    path: '../src/slices/{{camelCase name}}/useCases/load{{pascalCase name}}/Load{{pascalCase name}}.ts',
    templateFile: './templates/useCases/loadDomain/loadDomain.ts.hbs',
  },
  {
    type: 'add',
    path: '../src/slices/{{camelCase name}}/useCases/load{{pascalCase name}}/Load{{pascalCase name}}.spec.ts',
    templateFile: './templates/useCases/loadDomain/loadDomain.spec.ts.hbs',
  },
  {
    type: 'add',
    path: '../src/slices/{{camelCase name}}/useCases/load{{pascalCase name}}/index.ts',
    templateFile: './templates/useCases/loadDomain/index.ts.hbs',
  },
]

const entitiesCreations = [
  {
    type: 'add',
    path: '../src/slices/{{camelCase name}}/entities/{{pascalCase name}}Entity.ts',
    templateFile: './templates/entities/DomainEntity.ts.hbs',
  },
  {
    type: 'add',
    path: '../src/slices/{{camelCase name}}/entities/{{pascalCase name}}Entity.spec.ts',
    templateFile: './templates/entities/DomainEntity.spec.ts.hbs',
  },
  {
    type: 'add',
    path: '../src/slices/{{camelCase name}}/entities/index.ts',
    templateFile: './templates/entities/index.ts.hbs',
  },
]
