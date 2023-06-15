export function removeHtml(input: string, removeOptions: boolean = true) {
	let result = input;
	
	result = result.replace(/<p>/g, "");
	result = result.replace(/<\/p>/g, "");
	
	result = result.replace(/<div>/g, "");
	result = result.replace(/<\/div>/g, "");
	
	result = result.replace(/<ul>/g, "");
	result = result.replace(/<\/ul>/g, "");
	
	result = result.replace(/<li>/g, " -  ");
	result = result.replace(/<\/li>/g, "");
		
	if(removeOptions) {
		const end = result.indexOf("}") + 1;
		result = result.substring(end, result.length);
	}
	
	while(result.charAt(result.length - 1) == '\n')
		result = result.substring(0, result.length - 1);
	
	while(result.charAt(0) == "\n") {
		result = result.substring(1, result.length);
	}
	
	while(result.includes("\n\n")) {
		result = result.replace(/\n\n/g, "\n");
	}
	
	return result;
}