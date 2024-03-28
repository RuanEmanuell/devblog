export type Language = "Português" | "English";
export type Theme = "Dark" | "Light";

export const captions: Record<Language, string[]> = {
    "English": ["Home", "Portfolio", "Previous post", "Next post", "Latest posts", "Read more"],
    "Português": ["Início", "Portfólio", "Post anterior", "Próximo post", "Últimos posts", "Leia mais"]
};

export const colors: Record<Theme, string[]> = {
    "Light": ["bg-blue-500", "bg-white", "text-black", "text-blue-500"],
    "Dark": ["bg-black", "bg-gray-700", "text-white", "text-white"]
}


