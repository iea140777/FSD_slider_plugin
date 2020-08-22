
import Model from '../model';
import{IOptions} from '../presenter';
// const model = require('../model');

describe('Model:', () => {
    test ('methods should return correct model object with positive integers', () => {
        const _options = {
            minValue: 10,
            maxValue: 20,
            startingValue: [12, 15], 
            vertical:false,
            step: 5,
            moveBySteps: true,
            range: true,
            rangeInput: true,
            valueInputs: true,
            handlersAmount: 2, 
            scale: true,
            scaleLegend: true,
            icon: true,
            customValues: false,
            customValuesList: ''
        };
        const _model = new Model(_options);

        expect(_model.stepsAmount).toBe(2);
        expect(_model.valueRange).toBe(10);
        expect(_model.allValues).toEqual([{val: 10, percent: 0},
                                        {val: 15, percent:50},
                                        {val: 20, percent:100}
                                    ]);
        expect(_model.currentValue).toEqual([12, 15]); 
        expect(_model.customValuesList).toBeUndefined; 
        expect(_model.customStepsAmount).toBeUndefined;
        expect(_model.rangeValue).toBe(3);
        expect(_model.stepPercent).toBe(50);
        expect(_model.valuePercent).toBe(10);
    });

    test ('methods should return correct model object with negative integers', () => {
        const _options = {
            minValue: -20,
            maxValue: -10,
            startingValue: [-12, -15], 
            vertical:false,
            step: 5,
            moveBySteps: true,
            range: true,
            rangeInput: true,
            valueInputs: true,
            handlersAmount: 2, 
            scale: true,
            scaleLegend: true,
            icon: true,
            customValues: false,
            customValuesList: ''
        };
        const _model = new Model(_options);

        expect(_model.stepsAmount).toBe(2);
        expect(_model.valueRange).toBe(10);
        expect(_model.allValues).toEqual([{val: -20, percent: 0},
                                        {val: -15, percent:50},
                                        {val: -10, percent:100}
                                    ]);
        expect(_model.currentValue).toEqual([-12, -15]); 
        expect(_model.customValuesList).toBeUndefined; 
        expect(_model.customStepsAmount).toBeUndefined;
        expect(_model.rangeValue).toBe(3);
        expect(_model.stepPercent).toBe(50);
        expect(_model.valuePercent).toBe(10);
    });

    test ('methods should return correct model object with decimals', () => {
        const _options = {
            minValue: 0,
            maxValue: 1,
            startingValue: [0.1, 0.5], 
            vertical:false,
            step: 0.1,
            moveBySteps: true,
            range: true,
            rangeInput: true,
            valueInputs: true,
            handlersAmount: 2, 
            scale: true,
            scaleLegend: true,
            icon: true,
            customValues: false,
            customValuesList: ''
        };
        const _model = new Model(_options);

        expect(_model.stepsAmount).toBe(10);
        expect(_model.valueRange).toBe(1);
        expect(_model.allValues[0].val).toBe(0);
        expect(_model.allValues[0].percent).toBeCloseTo(0);
        expect(_model.allValues[1].val).toBeCloseTo(0.1);
        expect(_model.allValues[1].percent).toBeCloseTo(10);
        expect(_model.allValues[2].val).toBeCloseTo(0.2);
        expect(_model.allValues[2].percent).toBeCloseTo(20);
        expect(_model.allValues[3].val).toBeCloseTo(0.3);
        expect(_model.allValues[3].percent).toBeCloseTo(30);
        expect(_model.allValues[4].val).toBeCloseTo(0.4);
        expect(_model.allValues[4].percent).toBeCloseTo(40);
        expect(_model.allValues[5].val).toBeCloseTo(0.5);
        expect(_model.allValues[5].percent).toBeCloseTo(50);
        expect(_model.allValues[6].val).toBeCloseTo(0.6);
        expect(_model.allValues[6].percent).toBeCloseTo(60);
        expect(_model.allValues[7].val).toBeCloseTo(0.7);
        expect(_model.allValues[7].percent).toBeCloseTo(70);
        expect(_model.allValues[8].val).toBeCloseTo(0.8);
        expect(_model.allValues[8].percent).toBeCloseTo(80);
        expect(_model.allValues[9].val).toBeCloseTo(0.9);
        expect(_model.allValues[9].percent).toBeCloseTo(90);
        expect(_model.allValues[10].val).toBeCloseTo(1);
        expect(_model.allValues[10].percent).toBeCloseTo(100);

        expect(_model.currentValue).toEqual([0.1, 0.5]); 
        expect(_model.customValuesList).toBeUndefined; 
        expect(_model.customStepsAmount).toBeUndefined;
        expect(_model.rangeValue).toBe(0.4);
        expect(_model.stepPercent).toBe(10);
        expect(_model.valuePercent).toBe(100);
    });

    test ('methods should return correct model object with custom values', () => {
        const _options = {
            minValue: 0.01,
            maxValue: 1,
            startingValue: [1, 3], 
            vertical:false,
            step: 0.1,
            moveBySteps: true,
            range: true,
            rangeInput: true,
            valueInputs: true,
            handlersAmount: 2, 
            scale: true,
            scaleLegend: true,
            icon: true,
            customValues: true,
            customValuesList: 'one, two, three, four, five'
        };
        const _model = new Model(_options);

        expect(_model.stepsAmount).toBe(5);
        expect(_model.valueRange).toBeUndefined;
        expect(_model.allValues).toEqual([{val: 'one', percent: 0},
                                                {val: 'two', percent:25},
                                                {val: 'three', percent:50},
                                                {val:'four', percent:75},
                                                {val: 'five', percent:100}
                                                ]); 
        expect(_model.currentValue).toEqual(['two', 'four']); 
        expect(_model.customValuesList).toEqual(['one', 'two', 'three', 'four', 'five']); 
        expect(_model.customStepsAmount).toBe(5);
        expect(_model.rangeValue).toBeUndefined;
        expect(_model.stepPercent).toBe(25);
        expect(_model.valuePercent).toBe(NaN);
    });

    test (`with custom values getCustomValuesOptions method should put 
    the 1st and the last values as starting values if starting values in options are not set correctly `, () => {
        const _options = {
            minValue: 0.01,
            maxValue: 1,
            startingValue: [8, 9], 
            vertical:false,
            step: 0.1,
            moveBySteps: true,
            range: true,
            rangeInput: true,
            valueInputs: true,
            handlersAmount: 2, 
            scale: true,
            scaleLegend: true,
            icon: true,
            customValues: true,
            customValuesList: 'one, two, three, four, five'
        };
        const _model = new Model(_options);

        expect(_model.stepsAmount).toBe(5);
        expect(_model.valueRange).toBeUndefined;
        expect(_model.allValues).toEqual([{val: 'one', percent: 0},
                                                {val: 'two', percent:25},
                                                {val: 'three', percent:50},
                                                {val:'four', percent:75},
                                                {val: 'five', percent:100}
                                                ]); 
        expect(_model.currentValue).toEqual(['one', 'five']); 
        expect(_model.customValuesList).toEqual(['one', 'two', 'three', 'four', 'five']); 
        expect(_model.customStepsAmount).toBe(5);
        expect(_model.rangeValue).toBeUndefined;
        expect(_model.stepPercent).toBe(25);
        expect(_model.valuePercent).toBe(NaN);
    });

    test (`with custom values getCustomValuesList method should stop building model and
     put message to console to fill in the values to the options list `, () => {
        const _options = {
            minValue: 0,
            maxValue: 0,
            startingValue: [8, 9], 
            vertical:false,
            step: 0.1,
            moveBySteps: true,
            range: true,
            rangeInput: true,
            valueInputs: true,
            handlersAmount: 2, 
            scale: true,
            scaleLegend: true,
            icon: true,
            customValues: true,
            customValuesList: ''
        };
        const _model = new Model(_options);
    //     let outputData = "";
    //     let storeLog = inputs => (outputData += inputs);
    // console["log"] = jest.fn(storeLog);
    // expect(outputData).toMatch("Slider: customValuesList should contain values");

        expect(_model.stepsAmount).toBeUndefined;
        expect(_model.valueRange).toBeUndefined;
        expect(_model.allValues).toBeUndefined; 
        expect(_model.currentValue).toBeUndefined; 
        expect(_model.customValuesList).toBeUndefined; 
        expect(_model.customStepsAmount).toBeUndefined;
        expect(_model.rangeValue).toBeUndefined;
        expect(_model.stepPercent).toBeUndefined;
        expect(_model.valuePercent).toBeUndefined;
    });
});