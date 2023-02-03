import { Children, useState } from "react";
import { View } from "react-native";

export default function Pager({children, select}) {
	const childs = Children.toArray(children);
	return childs.map(child => {
		if(select == child.props.id) {
			return child;
		}
	});
}