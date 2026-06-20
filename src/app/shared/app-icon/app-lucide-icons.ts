import {
	LucideArrowLeft,
	LucideCheck,
	LucideChevronDown,
	LucideChevronRight,
	LucideFlaskConical,
	LucideHouse,
	LucideIcon,
	LucideList,
	LucideMenu,
	LucideMoon,
	LucidePalette,
	LucideSearchX,
	LucideSettings,
	LucideSun
} from '@lucide/angular';

const appLucideIconsConfig: Record<string, LucideIcon> = {
	'menu': LucideMenu,
	'settings': LucideSettings,
	'list': LucideList,
	'house': LucideHouse,
	'palette': LucidePalette,
	'sun': LucideSun,
	'moon': LucideMoon,
	'flask-conical': LucideFlaskConical,
	'search-x': LucideSearchX,
	'arrow-left': LucideArrowLeft,
	'check': LucideCheck,
	'chevron-right': LucideChevronRight,
	'chevron-down': LucideChevronDown
} as const;

export type AppRegisteredLucideIcon = keyof typeof appLucideIconsConfig;

export const appLucideIcons = Object.values(appLucideIconsConfig);
