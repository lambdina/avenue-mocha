export interface IProductProps {
    id: string,
    name: string,
    href: string,
    price: string,
    imageSrc: string,
    imageAlt: string,
    description?: string,
    isCreamOn?: boolean,
    numberOfIce?: number,
    numberOfSugar?: number,
    size?: number,
    hasBeenSelected?: React.Dispatch<React.SetStateAction<boolean>>
}
export const products: Array<IProductProps> = [
    {
        id: "1",
        name: 'Caffé Latte',
        href: '#',
        price: '$48',
        imageSrc: 'https://www.starbucks.fr/sites/starbucks-fr/files/styles/c04_image_text_grid_600x600/public/2020-07/Starbucks_FR_Deliveroo_1200x1200_Hot_Drinks_Caffe_Latte.jpg.webp?itok=sqeqXDrx',
        imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
        description: "Our dark, rich espresso balanced with steamed milk and a light layer of foam. A perfect milk-forward warm-up."
    },
    {
        id: "2",
        name: 'Iced Latte',
        href: '#',
        price: '$35',
        imageSrc: 'https://www.starbucks.fr/sites/starbucks-fr/files/styles/c04_image_text_grid_600x600/public/2020-07/Starbucks_FR_Deliveroo_1200x1200_Iced_Latte_Glace.jpg.webp?itok=DdrMeD-a',
        imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
        description: "Our dark, rich espresso balanced with steamed milk and a light layer of foam. A perfect milk-forward warm-up."
    },
    {
        id: "3",
        name: 'Caramel Machiatto',
        href: '#',
        price: '$89',
        imageSrc: 'https://www.starbucks.fr/sites/starbucks-fr/files/styles/c04_image_text_grid_600x600/public/2020-09/Starbucks_FR_Website_600x600_Caramel_Macchiato.jpg.webp?itok=MyjUAqoJ',
        imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
        description: "Our dark, rich espresso balanced with steamed milk and a light layer of foam. A perfect milk-forward warm-up."
    },
    {
        id: "4",
        name: 'Machatto Latte',
        href: '#',
        price: '$35',
        imageSrc: 'https://www.starbucks.fr/sites/starbucks-fr/files/styles/c04_image_text_grid_600x600/public/2020-09/Starbucks_FR_Website_600x600_Iced_Caramel_Macchiato.jpg.webp?itok=4ER9psWg',
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
        description: "Our dark, rich espresso balanced with steamed milk and a light layer of foam. A perfect milk-forward warm-up."
    },
    // More products...
]