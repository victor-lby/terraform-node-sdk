const commands = {
    init: async (bash, context, options = []) => {
        const {
            debug,
            inlineOptions
        } = options;

        return bash.run(`terraform init ${inlineOptions || ''}`, context, { debug, callback: (stdout, stderr) => {
            const text = stderr || stdout;

            if(text.search('Terraform has been successfully initialized!') >= 0) {
                const backendRegex = /Successfully configured the backend \"(.*)\"/;
                let backend = backendRegex.exec(text);

                if(backend)
                    backend = backend[1];

                if(debug)
                    console.log('SUCCESSFULLY INITIATED TERRAFORM WITH BACKEND', backend);

                return {
                    status: 1,
                    backend
                }
            }

            if(text.search('Terraform initialized in an empty directory!') >= 0) {
                if(debug)
                    console.log('INITIATED ON A EMPTY DIR');

                return {
                    status: 0
                }
            }

            console.log('FAILED TO INITIATE TERRAFORM')
            return {
                status: -1
            };
        }});
    },

    plan: async (bash, context, options = [], callback = null) => {
        const {
            debug,
            inlineOptions
        } = options;

        return bash.run(`terraform plan ${inlineOptions || ''}`, context, { debug, callback });

    },

    apply: async (bash, context, options = []) => {
        const {
            debug,
            inlineOptions
        } = options;

        return bash.run(`terraform apply ${inlineOptions || ''}`, context, { debug, callback: (stdout, stderr) => {
            const text = stderr || stdout

            console.log(text)
            return -1;
        }});

    },

    destroy: async (bash, context, options = []) => {
        const {
            debug,
            inlineOptions
        } = options;

        return bash.run(`terraform destroy ${inlineOptions || ''}`, context, { debug, callback: (stdout, stderr) => {
            const text = stderr || stdout

            console.log(text)
            return -1;
        }});

    },

    show: async (bash, context, options = [], callback = null) => {
        const {
            debug,
            inlineOptions
        } = options;

        return bash.run(`terraform show ${inlineOptions || ''}`, context, { debug, callback });
    },

    workspace: async (bash, context, options = [], callback = null) => {
        const {
            debug,
            inlineOptions
        } = options;

        return bash.run(`terraform workspace ${inlineOptions || ''}`, context, { debug, callback });
    }
}

module.exports = commands;