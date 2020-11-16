import { ValidationParser } from './ValidationParser';

export function init(app: any) {
    const parser = new ValidationParser();
    app.addHook(
        "parser-find-elements",
        (...args: any[]) => parser.parseElements.apply(parser, args as any),
        200
    )
}
