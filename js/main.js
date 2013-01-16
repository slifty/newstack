(function($) {
	$(function() {
		var tags = {};
		var projects = [];
		
		$.ajax({
			dataType: "json",
			url: "projects_static.php",
		})
		.done(function(data) {
			projects = data.objects;
			
			// Collect the tags
			for(var x in projects) {
				var project = projects[x];
				for(var y in project.tags) {
					var tag = project.tags[y];
					tag.count = 0;
					if(!(tag.name in tags))
						tags[tag.name] = tag;
					tags[tag.name].count++;
				}
			}
			
			// Sort the tags
			var newTags = [];
			for(var x in tags)
				newTags.push(tags[x]);
			tags = newTags;
			tags.sort(function(a,b) {
				return (a.name.toLowerCase()<b.name.toLowerCase())?-1:1;
			});
			
			// Render the form
			$technologies = $("#technologies");
			for(var x in tags) {
				var tag = tags[x];
				
				var $label = $("<label />")
					.addClass("checkbox")
					.text(tag.name)
					.appendTo($technologies)
				
				var $input = $("<input />")
					.attr("type","checkbox")
					.attr("value",tag.name)
					.attr("id","tech_" + x)
					.prependTo($label);
			}
		});
		
		$("#inputGenerate").click(function() {
			var technologies = [];
			var opportunities = [];
			
			$("#technologies").find("input:checked").each(function(index) {
				var $this = $(this);
				technologies.push($this.val());
			});
			
			for(var x in projects) {
				var project = projects[x];
				var needed = [];
				for(var y in project.tags) {
					var tag = project.tags[y];
					if(technologies.indexOf(tag) == -1)
						needed.push(tag.name);
				}
				if(!(needed.length in opportunities))
					opportunities[needed.length] = [];
				project.needed = needed;
				opportunities[needed.length].push(project);
			}
			
			var $opportunities = $("#opportunities");
			for(var x in opportunities) {
				var division = opportunities[x];
				var $division = $("<div />")
					.addClass("division")
					.appendTo($opportunities);

				var $headline = $("<h2 />")
					.text(x + " Technolog" + (x == 1?"y":"ies") + " Away")
					.appendTo($division);

				var $list = $("<ul />")
					.appendTo($division);

				for(var y in division) {
					var project = division[y];
					var $project = $("<li />")
						.appendTo($list)
					var $name = $("<h3 />")
						.addClass("name")
						.text(project.name)
						.appendTo($project);
					var $description = $("<div />")
						.addClass("description")
						.text(project.description)
						.appendTo($project)
					var $learn = $("<a />")
						.addClass("learn")
						.attr("href",project.source_url)
						.attr("target","_blank")
						.text("Learn More")
						.appendTo($project)
					var $code = $("<a />")
						.addClass("code")
						.attr("href",project.project_url)
						.attr("target","_blank")
						.text("View Source")
						.appendTo($project)
					var $tags = $("<ul />")
						.addClass("tags")
						.appendTo($project);
					for(var z in project.tags) {
						var tag = project.tags[z];
						var $tag = $("<li />")
							.addClass(project.needed.indexOf(tag.name)==-1?"used":"needed")
							.text(tag.name)
							.appendTo($tags);
					}
				}
			}

		});
	});
})(jQuery);