const { terraform, context } = require('./src');

context.set({
    name: 'prod',
    absolutePath: '/Users/victor/Documents/projects/infra-problem-latest/infra/backend-support'
});

const readablePlan = async () => {
    await terraform.init(context.get());
    await terraform.plan(context.get(), { debug: true, inlineOptions: '-out holder' });
    const json = await terraform.show(context.get(), { debug: true, inlineOptions: '-json holder' });
    const encodedJson = JSON.parse(json);

    console.log(encodedJson.configuration.root_module);
}

(async () => console.log(await readablePlan()))();