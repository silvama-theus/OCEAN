"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useState, useEffect } from "react";

// Local fallback implementation of the color mode hook to avoid a missing module.
// If you later add a shared context file, remove this local implementation and import it instead.
function useColorMode() {
	const [isGrayMode, setIsGrayMode] = useState<boolean>(() => {
		try {
			return localStorage.getItem("gray-mode") === "true";
		} catch {
			return false;
		}
	});

	useEffect(() => {
		try {
			localStorage.setItem("gray-mode", String(isGrayMode));
			if (isGrayMode) {
				document.documentElement.style.filter = "grayscale(1)";
			} else {
				document.documentElement.style.filter = "";
			}
		} catch {
			// ignore errors during SSR or if storage is unavailable
		}
	}, [isGrayMode]);

	const toggleGrayMode = () => setIsGrayMode((v) => !v);

	return { isGrayMode, toggleGrayMode };
}
export function ColorModeToggle() {
	const { isGrayMode, toggleGrayMode } = useColorMode();

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={toggleGrayMode}
			className={`relative transition-all duration-300 ${
				isGrayMode
					? "bg-transparent hover:bg-muted"
					: "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
			}`}
			title={isGrayMode ? "Enable Colors" : "Disable Colors"}>
			{isGrayMode ? (
				<Icons.eyeOff className="h-5 w-5 text-muted-foreground" />
			) : (
				<Icons.eye className="h-5 w-5" />
			)}
			<span className="sr-only">
				{isGrayMode ? "Enable Colors" : "Disable Colors"}
			</span>
		</Button>
	);
}
