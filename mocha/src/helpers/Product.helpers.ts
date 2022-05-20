import {ICustomProductProps} from "../types/Product.types";

export function getStoredCommandsWithId(id: string | undefined): Array<ICustomProductProps> {
    if (!id) return [];
    const commands: Array<ICustomProductProps> = getStoredCommands();

    return commands.filter((product) => (product.id === id))

}

export function getStoredCommands(): Array<ICustomProductProps> {
    const commandsString: string | null = localStorage.getItem("commands");
    if (!commandsString) return [];
    return JSON.parse(commandsString);

}