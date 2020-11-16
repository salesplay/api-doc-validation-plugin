interface Validator {
    name: string;
    description: string;
    paramCount: number;
}

interface Element {
    source: string;
    name: string;
    sourceName: string;
    content: string;
}

export class ValidationParser {
    private validators: { [x: string]: Validator } = {};
    private existParams: string[] = [];

    /**
       * Plugin parse entry function
       *
       * @param elements All elements generated by apidoc
       * @param element this element
       * @param block
       * @param filename
       */
    public parseElements(elements: Element[], element: Element, _block: any, _filename: any) {
        if (element.name === "apivalidator") {
            elements.pop();

            const splitted = element.content.split(" ");
            const validator = splitted.shift();
            if (!validator) {
                return;
            }
            const validatorDetails = parseValidatorDetails(validator);

            const validatorDescription = splitted.join(" ");

            if (validatorDetails) {
                this.validators[validatorDetails.name] = {
                    name: validatorDetails.name,
                    description: validatorDescription,
                    paramCount: validatorDetails.params.length
                };
            }

        } else if (element.name === "apivalidate") {
            elements.pop();

            const splitted = element.content.split(" ");

            const paramName = splitted.shift();
            const validator = splitted.shift();
            const optDescription = splitted.join(" ").trim();

            if (!validator || !paramName) {
                return;
            }
            const validatorDetails = parseValidatorDetails(validator);

            if (!validatorDetails) {
                return;
            }

            if (
                !this.validators[validatorDetails.name] ||
                validatorDetails.params.length
                !== this.validators[validatorDetails.name].paramCount
            ) {
                return;
            }

            const paramIndex = this.searchLastParam(elements, paramName);
            if (typeof paramIndex === "undefined") {
                return;
            }

            let append = "";

            if (!this.existParams.includes(paramName)) {
                append += "<h4> Validation Rules:-</h4>";
            }
            this.existParams.push(paramName);

            append += "- <code>"
                + validatorDetails.name;

            if (validatorDetails.params.length > 0) {
                append += ":" + validatorDetails.params.join(":");
            }

            append += "</code> - ";

            if (optDescription && optDescription.trim() !== "") {
                append += optDescription;
            } else {
                append += this.validators[validatorDetails.name].description;
            }

            append += "<br/>";

            elements[paramIndex].content += append;
            elements[paramIndex].source += append;

        }
    }

    private searchLastParam(elements: Element[], name: string): number | undefined {
        const length = elements.length;

        for (let i = length - 1; i >= 0; i--) {
            const curElement = elements[i];

            if (curElement.name === "apiparam" && curElement.content.split(" ")[0] === name) {
                return i;
            }
        }
        return undefined;
    }
}

const parseValidatorDetails = (validator: string): {
    name: string,
    params: string[],
} | undefined => {
    const validatorParams = validator.split(":");
    const validatorName = validatorParams.shift();

    if (validatorName) {
        return { name: validatorName, params: validatorParams };
    }

    return undefined;
};
