export interface IMenuLink {
    id: number;
    name: string,
    description: string,
    to: string,
    color: string,
    children: IMenuLink[]
}

export const linkTree: IMenuLink = {
    id: 0,
    name: "Home",
    description: "Home",
    to: "",
    color: "white",
    children: [
            {
                id: 1,
                name: "Dashboard",
                description: "Dashboard",
                to: "/",
                color: "#8A9A5B",
                children: []
            },
            {
                id: 2,
                name: "Animations",
                description: "Animations",
                to: "",
                color: "#6082B6",
                children: [
                    {
                        id: 3,
                        name: "scrollEffect",
                        description: "Scrolling Image Effect",
                        to: "/scrollEffect",
                        color: "#6082B6",
                        children: []
                    }
                ]
            },
            {
                id: 6,
                name: "Quiz",
                description: "Quiz",
                to: "",
                color: "#9B59B6 ",
                children: [
                    {
                        id: 7,
                        name: "General Knowledge",
                        description: "General Knowledge Quiz",
                        to: "/quiz/general",
                        color: "#9B59B6 ",
                        children: [
                            
                        ]
                    },
                    {
                        id: 8,
                        name: "Art",
                        description: "Art Quiz",
                        to: "/quiz/art",
                        color: "#9B59B6 ",
                        children: [
                            
                        ]
                    },
                    {
                        id: 9,
                        name: "Sports",
                        description: "Sports Quiz",
                        to: "/quiz/sports",
                        color: "#9B59B6 ",
                        children: [
                            
                        ]
                    },
                    {
                        id: 10,
                        name: "Politics",
                        description: "Politics Quiz",
                        to: "/quiz/politics",
                        color: "#9B59B6 ",
                        children: [
                            
                        ]
                    }
                ]
            }
        ]
}