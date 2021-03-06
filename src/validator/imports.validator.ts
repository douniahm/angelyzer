import {Validator} from './validator';
import {RuleEnum} from '../model/rule.enum';
import {elementNotInRightPlace, elementsNotInRightPlace} from '../template/element-not-in-right-place.template';
import {Validation} from '../model/validation.model';
import {AngularModule} from '../model/angular-module.model';
/**
 * Angular Modules Imports validator
 */
export class ImportsValidator implements Validator {
    /**
     * validate if the given module does not have other objects thant Modules in imports
     * @param module
     * @param ast
     * @returns {Validation}
     */
    validate(module: AngularModule, ast?: any): Validation {
        const listOfImportsViolations = [];
        for (const anImport of module.imports) {
            if (!anImport.match(/.+Module$/)) {
                listOfImportsViolations.push(elementNotInRightPlace(anImport, 'imports'));
            }
        }
        if (listOfImportsViolations.length > 0) {
            return new Validation({
                rule: RuleEnum.IMPORT_NON_MODULE.toString(),
                className: module.name,
                error: elementsNotInRightPlace(listOfImportsViolations)
            });
        }
        return null;
    }

}