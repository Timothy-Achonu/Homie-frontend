import Avatar from "@/public/images/avatar.jpg";
import { Testimonial } from "./models";

export const testimonials: Testimonial[] = [
    {
        name: "Lori Bryson",
        role: "Product Designer",
        company: "Sisyphus",
        avatar: Avatar,
        quote: "Untitled has saved us thousands of hours of work. We're able to spin up projects and features much faster.",
    },
    {
        name: "Diego Martinez",
        role: "Engineering Manager",
        company: "Helios Labs",
        avatar: Avatar,
        quote: "The developer experience is fantastic. Our onboarding time dropped from weeks to days.",
    },
    {
        name: "Aisha Khan",
        role: "Head of Operations",
        company: "Northwind",
        avatar: Avatar,
        quote: "Rock-solid components and patterns helped us standardize quickly across teams.",
    },
    {
        name: "Kenji Tanaka",
        role: "CTO",
        company: "Orbit Systems",
        avatar: Avatar,
        quote: "Performance and accessibility out of the box. It just works.",
    },
    {
        name: "Sofia Rossi",
        role: "Product Lead",
        company: "Acme Co",
        avatar: Avatar,
        quote: "Our team ships faster and with more confidence than ever before.", 
    },
];
