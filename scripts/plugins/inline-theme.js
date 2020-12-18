class InlineTheme {
	apply(compiler) {
		this.removeThemeAssetsBeforeEmit(compiler);
		this.addThemeAssetsIntoHtml(compiler);
	}
	removeThemeAssetsBeforeEmit(compiler) {
		compiler.hooks.emit.tapAsync("InlineTheme", (compilation, cb) => {
			Object.keys(compilation.assets).forEach(key => {
				if (/theme/.test(key)) {
					console.log(key);
					delete compilation.assets[key];
				}
			});
			cb();
		});
	}
	addThemeAssetsIntoHtml(compiler) {
		compiler.hooks.compilation.tap("HtmlWebpackInlineChunkPlugin", function(
			compilation
		) {
			compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(
				"HtmlWebpackInlineChunkPlugin",
				function(htmlPluginData, callback) {
					// me.performInlining(compilation, htmlPluginData, callback);
					htmlPluginData.head;
					compilation;

					const targetChunkFiles = htmlPluginData.chunks.find(i =>
						/theme/.test(i.names[0])
					).files;
					htmlPluginData.head = htmlPluginData.head.filter(i => {
						const name = i.attributes.href;
						return !/theme/.test(name);
					});
					const cssFileName = targetChunkFiles.find(f => /\.css$/.test(f));
					const jsFileName = targetChunkFiles.find(f => /\.js$/.test(f));
					const cssSource = compilation.assets[cssFileName].source();
					const jsSource = compilation.assets[jsFileName].source();
					htmlPluginData.head.push({
						tagName: "style",
						closeTag: true,
						attributes: {
							type: "text/css",
							id: 'theme-css',
						},
						innerHTML: cssSource,
					});
					htmlPluginData.body = htmlPluginData.body.filter(i => {
						const name = i.attributes.src;
						return !/theme/.test(name);
					});
					htmlPluginData.head.push({
						tagName: 'script',
						closeTag: true,
						attributes: {
							defer:true,
							type:'text/javascript',
							id: 'theme-js'
						},
						innerHTML: jsSource,
					})

					// targetChunkFiles.forEach(f => {
					// 	const sourceCode = compilation.assets[f].source();
					// });

					callback();
				}
			);
		});
	}
}

module.exports = InlineTheme;
