/**
* @apiValidator required This parameter should not be null or empty string/array/object
*/
const required = (value: any) => !!value;

/**
* @apiValidator email This parameter shoud be in valid email format.
*/
const isEmail = (_email: string) => true;

/**
* @apiValidator min:{min} Length of the parameter should exceed the given minimum length.
*/
const isMin = (_txt: string, _min: number) => true;

/**
* @apiValidator mix Contains mix chars.
*/
const isMixChars = (_txt: string) => true;

/**
 * @api {post} /user/register register
 * @apiGroup user
 * @apiName register
 * @apiParam userEmail Email address of the new user
 * @apiValidate userEmail required
 * @apiValidate userEmail email
 * @apiParam {String} userPassword Password of the new user
 * @apiValidate userPassword min:6
 * @apiValidate userPassword mix Should contain an upper case letter,
 * lower case letter, number and a special character.
 */
const registerUser = (req: any, res: any) => {
    res.status(200);
}
