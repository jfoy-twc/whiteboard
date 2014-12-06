module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),



		less: {
			production: {
				options: {
					paths: ["less"],
					cleancss: true,
				},
				files: {
					"build/css/app.css": "client/less/bootstrap.less"
				}

			}
		}, 




		copy: {
			main: {
				nonull: true,
				cwd: 'client/bin/',
				src: '**',
				dest: 'build/',
				flatten: true,
				expand:true,
			},
			fonts : {
				cwd: 'client/res/font/',
				src: '**',
				dest: 'build/font/',
				expand:true,
			},
			libs : {
				cwd: 'client/script/libs/',
				src: '**',
				dest: 'build/js/',
				expand:true,
			},
			images : {
				cwd: 'client/res/image/',
				src: '**',
				dest: 'build/image/',
				expand:true,
			}
		},




		html2js: {
			options: {
				base:'client/',
				rename:function (moduleName) {
					return moduleName.replace('view/', '/view/');
				},
				htmlmin: {
					collapseWhitespace: true,
					removeComments: true
				}
			},
			main: {
				src: ['client/view/**/*.html'],
				dest: 'client/script/tmp/templates.js'
			},
		},



		uglify: {
			libs: {
				options: {
					mangle: false,
					beautify : false, 
				},
				files: [{
					expand: false,
					src: ['client/script/external/*.js'],
					dest: 'build/js/libs.js'
				}]
			},

			app: {
				options: {
					mangle: false,
					beautify : false, 
				},
				files: [{
					expand: false,
					src: [
						'client/script/app/*.js',
						'client/script/user/*.js',
						'client/script/course/*.js',
						'client/script/tmp/*.js'
					],
					dest: 'build/js/app.js'
				}]
			}



		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-html2js');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.registerTask('build', ['copy:main', 'copy:fonts', 'copy:libs', 'copy:images', 'html2js', 'uglify:app', 'uglify:libs', 'less']);
	grunt.registerTask('lesss', ['less']);
	grunt.registerTask('default', ['html2js', 'uglify:app']);
};