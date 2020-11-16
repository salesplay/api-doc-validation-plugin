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
 * @api {post} /user/register register
 * @apiGroup user
 * @apiName register
 * @apiParam userEmail Email address of the new user
 * @apiValidate userEmail required
 * @apiValidate userEmail email
 * @apiParam userPassword Password of the new user
 * @apiValidate userPassword min:6
 */
const registerUser = (req: any, res: any) => {
    res.status(200);
}
