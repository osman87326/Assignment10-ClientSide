import SidebarMenuRouter from "./SidebarMenuRouter";

const USER_MENU_GROUPS = [
    {
        title: "Personal Library",
        items: [
            { name: "My Lessons", href: "/my-lessons", iconName: "book" },
            { name: "Drafts", href: "/drafts", iconName: "edit" },
            { name: "Saved Lessons", href: "/saved-lessons", iconName: "bookmark" },
        ],
    },
    {
        title: "Insights",
        items: [
            { name: "Performance", href: "/performance", iconName: "chart" },
            { name: "Notebook Settings", href: "/settings", iconName: "settings" },
        ],
    },
];

const ADMIN_MENU_GROUPS = [
    {
        title: "Admin Control Center",
        items: [
            { name: "Command Center", href: "/admin/dashboard", iconName: "command" },
            { name: "Manage Users", href: "/admin/users", iconName: "users" },
            { name: "System Content", href: "/admin/content", iconName: "content" },
            { name: "Flagged Queue", href: "/admin/queue", iconName: "flag" },
            { name: "Appeals", href: "/admin/appeals", iconName: "bell" },
        ],
    },
    {
        title: "Configuration",
        items: [
            { name: "Admin Profile", href: "/admin/profile", iconName: "profile" },
            { name: "System Settings", href: "/admin/settings", iconName: "settings" },
        ],
    },
];

export default function Sidebar({ isMobileMenuOpen, setIsMobileMenuOpen }) {
    return (
        <SidebarMenuRouter
            userMenu={USER_MENU_GROUPS}
            adminMenu={ADMIN_MENU_GROUPS}
            isMobileMenuOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
        />
    );
}