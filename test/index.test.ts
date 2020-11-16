// @ts-ignore
import * as apidoc from "apidoc-core";
import * as fs from "fs-extra";
import * as should from "should";

describe("test generate doc", async () => {
    const logger = {
        debug: console.log,
        verbose: console.log,
        info: console.log,
        warn: console.log,
        error: console.log
    };

    before(async () => {
        fs.removeSync("./tmp/");
    });

    it("created docs should equal to expect", async () => {
        apidoc.setLogger(logger);
        apidoc.setGeneratorInfos({});
        apidoc.setPackageInfos({
            "name": "test",
            "version": "0.0.0"
        });

        const api = apidoc.parse({
            src: "test/src/",
        });
        const createdContent = JSON.parse(api.data);
        const { parameter } = createdContent[0];
        console.log(JSON.stringify(createdContent));

        should.equal(parameter.fields.Parameter[0].field, "userEmail");
        should.equal(parameter.fields.Parameter[0].description,
            "Email address of the new user"
            + "<h4> Validation Rules:-</h4>"
            + "- <code>required</code> - "
            + "This parameter should not be null or empty string/array/object<br/>"
            + "- <code>email</code> - This parameter shoud be in valid email format."
            + "<br/>");
        should.equal(parameter.fields.Parameter[1].field, "userPassword");
        should.equal(parameter.fields.Parameter[1].description,
            "Password of the new user"
            + "<h4> Validation Rules:-</h4>"
            + "- <code>min:6</code> - "
            + "Length of the parameter should exceed the given minimum length."
            + "<br/>");
    });
});
