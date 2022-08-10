var Generator = require('yeoman-generator');

module.exports = class extends Generator {


	async prompting() {
		this.answers = await this.prompt([
			{
				type: "input",
				name: "id",
				message: "What is the module id ?"
			},
			{
				type: "input",
				name: "name",
				message: "What is the module name ?"
			},
			{
				type: "input",
				name: "description",
				message: "What is the module description ?",
				default: ""
			},
			{
				type: "input",
				name: "url",
				message: "What is the module repository URL ?"
			},
			{
				type: "list",
				name: "isLibrary",
				choices: ["false", "true"],
				message: "Is module a library ?",
				default: "false"
			},
			{
				type: "list",
				name: "useSocket",
				choices: ["false", "true"],
				message: "Do module use socket ?",
				default: "false"
			},
			{
				type: "input",
				name: "authorName",
				message: "What is the author name ?",
				default: "",
				store: true
			},
			{
				type: "input",
				name: "authorMail",
				message: "What is the author mail ?",
				default: "",
				store: true
			},
			{
				type: "input",
				name: "authorDiscord",
				message: "What is the author discord ?",
				default: "",
				store: true
			},

			{
				type: "input",
				name: "minimumVersion",
				message: "What is minimum required version ?",
				default: "10"
			},
			{
				type: "input",
				name: "verifiedVersion",
				message: "What is last verified version ?",
				default: "10"
			}
		]);
	}

	writing() {
		const data = {
			id: this.answers.id,
			name: this.answers.name,
			description: this.answers.description,
			url: this.answers.url,
			autherName: this.answers.authorName,
			authorMail: this.answers.authorMail,
			authorDiscord: this.answers.authorDiscord,
			isLibrary: this.answers.isLibrary,
			useSocket: this.answers.useSocket,
			minimumVersion: this.answers.minimumVersion,
			verifiedVersion: this.answers.verifiedVersion
		};

		const list = [
			"module.json",
			"README.md",
			"CHANGELOG.md",
			"LICENSE",
			".gitignore",
			".github/workflows/main.yaml",
			"module/assets/.gitkeep",
			"module/languages/en.json",
			"module/packs/.gitkeep",
			"module/scripts/.gitkeep",
			"module/styles/.gitkeep",
			"module/templates/.gitkeep"
		]

		list.forEach(x => {

			if (Array.isArray(x)) {
				this.fs.copyTpl(
					this.templatePath(x[0]),
					this.destinationPath(x[1]),
					data);
			}
			else {
				this.fs.copyTpl(
					this.templatePath(x),
					this.destinationPath(x),
					data);
			}
		});
	}
};