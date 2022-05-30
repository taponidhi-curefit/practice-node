import _ from 'lodash';
import fs from 'fs';

type Gender = {
	possibleAnswerId?: 'MALE' | 'FEMALE' | 'OTHER';
	meta?: {
		derived?: 'MALE' | 'FEMALE';
	}
};

type Age = '30' | '60';

type BodyType = {
	possibleAnswerId?: 'LEAN' | 'ATHLETIC' | 'AVERAGE' | 'OVERWEIGHT' | 'OBESE';
	meta?: {
		derived?: 'LEAN' | 'ATHLETIC' | 'AVERAGE' | 'OVERWEIGHT' | 'OBESE';
	}
};

type FitnessLevel = {
	possibleAnswerId?: 'NOVICE' | 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
	meta?: {
		derived?: 'NOVICE' | 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
	}
};

type Goal = {
	possibleAnswerId?: 'LOSE WEIGHT' | 'GAIN MUSCLE' | 'STAY FIT' | 'BODY RECOMP' | 'GET SHREDDED' | 'MARATHON' | 'POWER LIFTING' | 'TONE UP';
	meta?: {
		derived?: 'LOSE WEIGHT' | 'GAIN MUSCLE' | 'STAY FIT' | 'BODY RECOMP' | 'GET SHREDDED' | 'MARATHON' | 'POWER LIFTING';
	}
};

type FocusArea = {
	possibleAnswerId?: 'NONE' | 'BELLY_AND_HIP_FAT' | 'BELLY_FAT' | 'LOWER_BODY' | 'ABS_OBLIQUES' | 'ABT';
	meta?: {
		derived?: 'NONE' | 'ABT';
	}
};

type MuscleSplitType = {
	possibleAnswerId?: 'SINGLE' | 'MULTI' | 'PUSH_PULL_LEGS' | 'UPPER_LOWER';
	meta?: {
		derived?: 'SINGLE' | 'MULTI' | 'PUSH_PULL_LEGS' | 'UPPER_LOWER';
	}
};

type WorkoutDays = '3' | '4' | '5' | '6';

type ResultPace = {
	possibleAnswerId?: 'I_WILL_TAKE_MY_TIME' | 'HEALTHY' | 'TAKE_IT_UP_A_NOTCH';
	meta?: {
		derived?: 'I_WILL_TAKE_MY_TIME' | 'HEALTHY' | 'TAKE_IT_UP_A_NOTCH';
	}
};

type ProblemArea = {
	possibleAnswerId?: 'HIP_AND_LOWER_BACK_AND_BACK_AND_NECK' | 'SHOULDERS' | 'KNEE' | 'ASTHMA_HYPERTENSION_THYROID' | 'NONE';
	meta?: {
		derived?: 'HIP_AND_LOWER_BACK_AND_BACK_AND_NECK' | 'SHOULDERS' | 'KNEE' | 'ASTHMA_HYPERTENSION_THYROID' | 'NONE';
	}
};

interface FormInput {
	gender?: Gender;
	age?: Age;
	bodyType?: BodyType;
	fitnessLevel?: FitnessLevel;
	goal?: Goal;
	focusArea?: FocusArea;
	muscleSplitType?: MuscleSplitType;
	workoutDays?: WorkoutDays;
	resultPace?: ResultPace;
	problemArea?: ProblemArea;
}

const allFormInputs: FormInput[] = [];

function decisionGender(formInput: FormInput) {
	let possibleGenders: Gender[] = [
		{possibleAnswerId: 'MALE', meta: {derived: 'MALE'}},
		{possibleAnswerId: 'FEMALE', meta: {derived: 'FEMALE'}},
		{possibleAnswerId: 'OTHER', meta: {derived: 'MALE'}}
	];
	for (const curGender of possibleGenders) {
		formInput.gender = curGender;
		decisionAge(formInput);
		formInput.gender = undefined;
	}
}

function decisionAge(formInput: FormInput) {
	let possibleAges: Age[] = ['30', '60'];
	for (const curAge of possibleAges) {
		formInput.age = curAge;
		decisionBodyType(formInput);
		formInput.age = undefined;
	}
}

function decisionBodyType(formInput: FormInput) {
	let possibleBodyTypes: BodyType[] = [
		{possibleAnswerId: 'LEAN', meta: {derived: 'LEAN'}},
		{possibleAnswerId: 'ATHLETIC', meta: {derived: 'ATHLETIC'}},
		{possibleAnswerId: 'AVERAGE', meta: {derived: 'AVERAGE'}},
		{possibleAnswerId: 'OVERWEIGHT', meta: {derived: 'OVERWEIGHT'}},
		{possibleAnswerId: 'OBESE', meta: {derived: 'OBESE'}},
	];
	for (const curBodyType of possibleBodyTypes) {
		formInput.bodyType = curBodyType;
		decisionFitnessLevel(formInput);
		formInput.bodyType = undefined;
	}
}

function decisionFitnessLevel(formInput: FormInput) {
	let possibleFitnessLevels: FitnessLevel[] = [
		{possibleAnswerId: "NOVICE", meta: {derived: 'NOVICE'}},
		{possibleAnswerId: "BEGINNER", meta: {derived: 'BEGINNER'}},
		{possibleAnswerId: "INTERMEDIATE", meta: {derived: 'INTERMEDIATE'}},
		{possibleAnswerId: "ADVANCED", meta: {derived: 'ADVANCED'}},
	];

	for (const fitnessLevel of possibleFitnessLevels) {
		formInput.fitnessLevel = fitnessLevel;
		decisionGoal(formInput);
		formInput.fitnessLevel = undefined;
	}
}

function decisionGoal(formInput: FormInput) {
	const {gender, age, bodyType, fitnessLevel} = formInput;
	const goalScreenId = eval(`
		if (parseInt(age) <= 45 && (typeof fitnessLevel === 'undefined' || fitnessLevel === undefined || fitnessLevel.possibleAnswerId === undefined || fitnessLevel.possibleAnswerId === 'NOVICE')) {
			's-goal-1';
		} else if (parseInt(age) <= 45 && (typeof fitnessLevel !== 'undefined' && fitnessLevel !== undefined && fitnessLevel.possibleAnswerId !== undefined) && (fitnessLevel.possibleAnswerId === 'BEGINNER' || fitnessLevel.possibleAnswerId === 'INTERMEDIATE') && (gender.possibleAnswerId === 'MALE' || (gender.meta !== undefined && gender.meta.derived === "MALE"))) {
			's-goal-2';
		} else if (parseInt(age) <= 45 && (typeof fitnessLevel !== 'undefined' && fitnessLevel !== undefined && fitnessLevel.possibleAnswerId !== undefined) && (fitnessLevel.possibleAnswerId === 'BEGINNER' || fitnessLevel.possibleAnswerId === 'INTERMEDIATE') && gender.possibleAnswerId === 'FEMALE') {
			's-goal-3';
		} else if (parseInt(age) <= 45 && (typeof fitnessLevel !== 'undefined' && fitnessLevel !== undefined && fitnessLevel.possibleAnswerId !== undefined) && fitnessLevel.possibleAnswerId === 'ADVANCED') {
			's-goal-4';
		} else if (parseInt(age) > 45 && (typeof fitnessLevel === 'undefined' || fitnessLevel === undefined || fitnessLevel.possibleAnswerId === undefined || fitnessLevel.possibleAnswerId === 'NOVICE' || fitnessLevel.possibleAnswerId === 'BEGINNER' || fitnessLevel.possibleAnswerId === 'INTERMEDIATE')) {
			's-goal-5';
		} else if (parseInt(age) > 45 && (typeof fitnessLevel !== 'undefined' && fitnessLevel !== undefined && fitnessLevel.possibleAnswerId !== undefined) && fitnessLevel.possibleAnswerId === 'ADVANCED') {
			's-goal-6';
		} else {
			's-goal-5';
		}
	`);
	let possibleGoals: Goal[] = [];
	switch (goalScreenId) {
		case 's-goal-1':
			possibleGoals = [
				{possibleAnswerId: 'LOSE WEIGHT', meta: {derived: 'LOSE WEIGHT'}},
				{possibleAnswerId: 'GAIN MUSCLE', meta: {derived: 'GAIN MUSCLE'}},
				{possibleAnswerId: 'STAY FIT', meta: {derived: 'STAY FIT'}},
			];
			break;
		case 's-goal-2':
			possibleGoals = [
				{possibleAnswerId: 'LOSE WEIGHT', meta: {derived: 'LOSE WEIGHT'}},
				{possibleAnswerId: 'TONE UP', meta: {derived: 'BODY RECOMP'}},
				{possibleAnswerId: 'GAIN MUSCLE', meta: {derived: 'GAIN MUSCLE'}},
				{possibleAnswerId: 'STAY FIT', meta: {derived: 'STAY FIT'}},
				{possibleAnswerId: 'MARATHON', meta: {derived: 'MARATHON'}}
			];
			break;
		case 's-goal-3':
			possibleGoals = [
				{possibleAnswerId: 'LOSE WEIGHT', meta: {derived: 'LOSE WEIGHT'}},
				{possibleAnswerId: 'TONE UP', meta: {derived: 'BODY RECOMP'}},
				{possibleAnswerId: 'GAIN MUSCLE', meta: {derived: 'GAIN MUSCLE'}},
				{possibleAnswerId: 'STAY FIT', meta: {derived: 'STAY FIT'}},
				{possibleAnswerId: 'MARATHON', meta: {derived: 'MARATHON'}}
			];
			break;
		case 's-goal-4':
			possibleGoals = [
				{possibleAnswerId: 'LOSE WEIGHT', meta: {derived: 'LOSE WEIGHT'}},
				{possibleAnswerId: 'GET SHREDDED', meta: {derived: 'GET SHREDDED'}},
				{possibleAnswerId: 'GAIN MUSCLE', meta: {derived: 'GAIN MUSCLE'}},
				{possibleAnswerId: 'STAY FIT', meta: {derived: 'STAY FIT'}},
				{possibleAnswerId: 'MARATHON', meta: {derived: 'MARATHON'}},
				{possibleAnswerId: 'POWER LIFTING', meta: {derived: 'POWER LIFTING'}}
			];
			break;
		case 's-goal-5':
			possibleGoals = [
				{possibleAnswerId: 'STAY FIT', meta: {derived: 'STAY FIT'}},
				{possibleAnswerId: 'LOSE WEIGHT', meta: {derived: 'LOSE WEIGHT'}},
				{possibleAnswerId: 'GAIN MUSCLE', meta: {derived: 'GAIN MUSCLE'}},
			];
			break;
		case 's-goal-6':
			possibleGoals = [
				{possibleAnswerId: 'STAY FIT', meta: {derived: 'STAY FIT'}},
				{possibleAnswerId: 'LOSE WEIGHT', meta: {derived: 'LOSE WEIGHT'}},
				{possibleAnswerId: 'GAIN MUSCLE', meta: {derived: 'GAIN MUSCLE'}},
				{possibleAnswerId: 'MARATHON', meta: {derived: 'MARATHON'}},
			];
			break;
	}
	for (const curGoal of possibleGoals) {
		formInput.goal = curGoal;
		decisionFocusArea(formInput);
		formInput.goal = undefined;
	}
}

function decisionFocusArea(formInput: FormInput) {
	const {gender, age, bodyType, fitnessLevel, goal} = formInput;
	const focusAreaDecisionResult = eval(`
		if ((bodyType.possibleAnswerId === 'OVERWEIGHT' || bodyType.possibleAnswerId === 'OBESE') && (goal.possibleAnswerId === 'LOSE WEIGHT' || goal.possibleAnswerId === 'TONE UP' || goal.possibleAnswerId === 'STAY FIT')) {
			's-focus-area-1';
		} else if ((bodyType.possibleAnswerId === 'LEAN' || bodyType.possibleAnswerId === 'ATHLETIC' || bodyType.possibleAnswerId === 'AVERAGE') && (goal.possibleAnswerId === 'LOSE WEIGHT' || goal.possibleAnswerId === 'TONE UP' || goal.possibleAnswerId === 'STAY FIT')) {
			's-focus-area-2';
		} else if (goal.possibleAnswerId === 'GAIN MUSCLE') {
			's-focus-area-3';
		} else if (goal.possibleAnswerId === 'GET SHREDDED' || goal.possibleAnswerId === 'POWER LIFTING') {
			'd-muscle-split-type'
		} else {
			's-focus-area-1';
		}
	`);

	let possibleFocusAreas: FocusArea[] = [];
	switch (focusAreaDecisionResult) {
		case 's-focus-area-1':
			possibleFocusAreas = [
				{possibleAnswerId: 'NONE', meta: {derived: 'NONE'}},
				{possibleAnswerId: 'ABT', meta: {derived: 'ABT'}},
			];
			break;
		case 's-focus-area-2':
			possibleFocusAreas = [
				{possibleAnswerId: 'NONE', meta: {derived: 'NONE'}},
				{possibleAnswerId: 'ABT', meta: {derived: 'ABT'}},
			];
			break;
		case 's-focus-area-3':
			possibleFocusAreas = [
				{possibleAnswerId: 'NONE', meta: {derived: 'NONE'}},
				{possibleAnswerId: 'ABT', meta: {derived: 'ABT'}},
			];
			break;
		default:
			possibleFocusAreas = [
				{possibleAnswerId: 'NONE', meta: {derived: 'NONE'}},
			];
	}
	for (const curFocusArea of possibleFocusAreas) {
		formInput.focusArea = curFocusArea;
		decisionMuscleSplitType(formInput);
		formInput.focusArea = undefined;
	}
}

function decisionMuscleSplitType(formInput: FormInput) {
	const {gender, age, bodyType, fitnessLevel, goal, focusArea} = formInput;
	const focusAreaDecisionResult = eval(`
		if (parseInt(age) > 45) {
			's-muscle-split-type-3';
		} else if ((typeof fitnessLevel === 'undefined' || fitnessLevel === undefined || fitnessLevel.possibleAnswerId === undefined || fitnessLevel.possibleAnswerId === 'NOVICE') && (goal.possibleAnswerId === 'LOSE WEIGHT' || goal.possibleAnswerId === 'GAIN MUSCLE')) {
			's-muscle-split-type-5';
		} else if (goal.possibleAnswerId === 'TONE UP' || goal.possibleAnswerId === 'MARATHON') {
			's-muscle-split-type-3';
		} else if (goal.possibleAnswerId === 'GAIN MUSCLE') {
			's-muscle-split-type-1';
		} else if (goal.possibleAnswerId === 'LOSE WEIGHT') {
			's-muscle-split-type-2';
		} else if (goal.possibleAnswerId === 'GET SHREDDED') {
			's-muscle-split-type-4';
		} else {
			'd-workout-days';
		}
	`);

	let possibleMuscleSplitTypes: MuscleSplitType[] = [];
	switch (focusAreaDecisionResult) {
		case 's-muscle-split-type-1':
			possibleMuscleSplitTypes = [
				{possibleAnswerId: 'SINGLE', meta: {derived: 'SINGLE'}},
				{possibleAnswerId: 'MULTI', meta: {derived: 'MULTI'}},
				{possibleAnswerId: 'PUSH_PULL_LEGS', meta: {derived: 'PUSH_PULL_LEGS'}}
			];
			break;
		case 's-muscle-split-type-2':
			possibleMuscleSplitTypes = [
				{possibleAnswerId: 'SINGLE', meta: {derived: 'SINGLE'}},
				{possibleAnswerId: 'MULTI', meta: {derived: 'MULTI'}},
				{possibleAnswerId: 'PUSH_PULL_LEGS', meta: {derived: 'PUSH_PULL_LEGS'}},
				{possibleAnswerId: 'UPPER_LOWER', meta: {derived: 'UPPER_LOWER'}},
			];
			break;
		case 's-muscle-split-type-3':
			possibleMuscleSplitTypes = [
				{possibleAnswerId: 'SINGLE', meta: {derived: 'SINGLE'}},
				{possibleAnswerId: 'MULTI', meta: {derived: 'MULTI'}},
				{possibleAnswerId: 'PUSH_PULL_LEGS', meta: {derived: 'PUSH_PULL_LEGS'}}
			];
			break;
		case 's-muscle-split-type-4':
			possibleMuscleSplitTypes = [
				{possibleAnswerId: 'SINGLE', meta: {derived: 'SINGLE'}},
				{possibleAnswerId: 'MULTI', meta: {derived: 'MULTI'}},
			];
			break;
		case 's-muscle-split-type-5':
			possibleMuscleSplitTypes = [
				{possibleAnswerId: 'MULTI', meta: {derived: 'MULTI'}},
			];
			break;
		default:
			possibleMuscleSplitTypes = [
				{possibleAnswerId: 'UPPER_LOWER', meta: {derived: 'UPPER_LOWER'}},
			];
	}

	for (const curMuscleSplitType of possibleMuscleSplitTypes) {
		formInput.muscleSplitType = curMuscleSplitType;
		decisionWorkoutDays(formInput);
		formInput.muscleSplitType = undefined;
	}
}

function decisionWorkoutDays(formInput: FormInput) {
	const {gender, age, bodyType, fitnessLevel, goal, focusArea, muscleSplitType} = formInput;
	const focusAreaDecisionResult = eval(`
		if ((parseInt(age) > 45 || goal.possibleAnswerId === 'TONE UP' || goal.possibleAnswerId === 'MARATHON') && (typeof muscleSplitType !== 'undefined' && muscleSplitType !== undefined && muscleSplitType.possibleAnswerId !== undefined && muscleSplitType.possibleAnswerId === 'PUSH_PULL_LEGS')) {
			's-workout-days-2';
		} else if (typeof muscleSplitType !== 'undefined' && muscleSplitType !== undefined && muscleSplitType.possibleAnswerId !== undefined && (((goal.possibleAnswerId === 'GAIN MUSCLE' || goal.possibleAnswerId === 'LOSE WEIGHT') && muscleSplitType.possibleAnswerId === 'PUSH_PULL_LEGS') || (goal.possibleAnswerId === 'GET SHREDDED' && muscleSplitType.possibleAnswerId === 'SINGLE'))) {
			's-workout-days-1';
		} else if (typeof muscleSplitType !== 'undefined' && muscleSplitType !== undefined && muscleSplitType.possibleAnswerId !== undefined && (muscleSplitType.possibleAnswerId === 'SINGLE' || (goal.possibleAnswerId === 'GET SHREDDED' && muscleSplitType.possibleAnswerId === 'MULTI') || (parseInt(age) > 45 && muscleSplitType.possibleAnswerId === 'SINGLE'))) {
			's-workout-days-3';
		} else if (goal.possibleAnswerId === 'POWER LIFTING' || (goal.possibleAnswerId === 'LOSE WEIGHT' && typeof muscleSplitType !== 'undefined' && muscleSplitType !== undefined && muscleSplitType.possibleAnswerId !== undefined && muscleSplitType.possibleAnswerId === 'UPPER_LOWER')) {
			's-workout-days-4';
		} else {
			's-workout-days-5';
		}
	`);

	let possibleWorkoutDaysInputs: WorkoutDays[] = [];
	switch (focusAreaDecisionResult) {
		case 's-workout-days-1':
			possibleWorkoutDaysInputs = ['6'];
			break;
		case 's-workout-days-2':
			possibleWorkoutDaysInputs = ['3', '4', '6'];
			break;
		case 's-workout-days-3':
			possibleWorkoutDaysInputs = ['5', '6'];
			break;
		case 's-workout-days-4':
			possibleWorkoutDaysInputs = ['3', '4'];
			break;
		case 's-workout-days-5':
			possibleWorkoutDaysInputs = ['3', '4', '5', '6'];
			break;
		default:
			possibleWorkoutDaysInputs = ['3', '4', '5', '6'];
	}

	for (const curWorkoutDaysInput of possibleWorkoutDaysInputs) {
		formInput.workoutDays = curWorkoutDaysInput;
		allFormInputs.push(_.cloneDeep(formInput));
		formInput.workoutDays = undefined;
	}
}

function decisionResultPace(formInput: FormInput) {
	const {goal} = formInput;
	const resultPaceDecisionResult = eval(`
		if (goal.possibleAnswerId === 'LOSE WEIGHT') {
			's-result-pace-1';
		} else if (goal.possibleAnswerId === 'GAIN MUSCLE') {
			's-result-pace-2';
		} else {
			'd-problem-area';
		}
	`);
}

function decisionProblemArea(formInput: FormInput) {
	const {goal} = formInput;
	const problemAreaDecisionResult = eval(`
		if (goal.possibleAnswerId === 'POWER LIFTING' || goal.possibleAnswerId === 'GET SHREDDED') {
			'd-view-plan';
		} else {
			's-problem-area';
		}
	`);
}

function decisionViewPlan(formInput: FormInput) {
	const {problemArea} = formInput;
	const viewPlanDecisionResult = eval(`
		if (typeof problemArea === 'undefined' || problemArea === undefined || problemArea.possibleAnswerId === undefined || problemArea.possibleAnswerId === 'NONE' || (problemArea.meta !== undefined && problemArea.meta.derived === 'NONE')) {
			's-view-plan-1';
		} else {
			's-view-plan-2';
		}
	`);
}

function modifyFormInputsToEnsurePlanCreation(formInput: FormInput) {
	if (formInput?.age !== undefined && parseInt(formInput?.age) > 45 && formInput.goal?.possibleAnswerId === 'LOSE WEIGHT') {
		formInput.goal = {possibleAnswerId: 'STAY FIT', meta: {derived: 'STAY FIT'}};
	}
	if (formInput?.age !== undefined && parseInt(formInput?.age) > 45 && (formInput?.fitnessLevel?.possibleAnswerId === 'NOVICE' || formInput?.fitnessLevel?.possibleAnswerId === 'INTERMEDIATE')) {
		formInput.fitnessLevel = {possibleAnswerId: 'BEGINNER', meta: {derived: 'BEGINNER'}};
	}
	if (formInput?.bodyType?.possibleAnswerId === 'OVERWEIGHT') {
		formInput.bodyType = {possibleAnswerId: 'OBESE', meta: {derived: 'OBESE'}};
	}
	if (formInput?.bodyType?.possibleAnswerId === 'LEAN' || formInput?.bodyType?.possibleAnswerId === 'ATHLETIC') {
		formInput.bodyType = {possibleAnswerId: 'AVERAGE', meta: {derived: 'AVERAGE'}};
	}
	if (formInput?.muscleSplitType?.possibleAnswerId === 'PUSH_PULL_LEGS' && formInput?.workoutDays !== undefined && parseInt(formInput?.workoutDays) === 5) {
		formInput.workoutDays = '6';
	}
	if (formInput?.goal?.possibleAnswerId === 'POWER LIFTING' && formInput?.bodyType?.possibleAnswerId === 'OBESE') {
		formInput.bodyType = {possibleAnswerId: 'AVERAGE', meta: {derived: 'AVERAGE'}};
	}
	if (formInput?.age !== undefined && parseInt(formInput?.age) <= 45 && formInput?.fitnessLevel?.possibleAnswerId === 'NOVICE' && formInput?.muscleSplitType?.possibleAnswerId === 'MULTI' && (formInput?.workoutDays === '3' || formInput?.workoutDays === '4')) {
		formInput.workoutDays = '5';
	}
	if (formInput?.goal?.possibleAnswerId === 'GET SHREDDED' && formInput?.bodyType?.possibleAnswerId === 'OBESE') {
		formInput.bodyType = {possibleAnswerId: 'AVERAGE', meta: {derived: 'AVERAGE'}};
	}
}

function printAllPaths() {
	decisionGender({});
	const columnNames = [
		'gender',
		'goal',
		'level',
		'muscle_split_type',
		'focus_area',
		'problem_area',
		'body_type',
		'age',
		'workout_days',
		'plan_title'
	];
	const columnNamesString = columnNames.join(",");
	const pathStrings = allFormInputs.map(formInput => {
		modifyFormInputsToEnsurePlanCreation(formInput);
		let rowValues = [
			`${formInput?.gender?.meta?.derived ?? formInput?.gender?.possibleAnswerId ?? "NULL"}`,
			`${formInput?.goal?.meta?.derived ?? formInput?.goal?.possibleAnswerId ?? "NULL"}`,
			`${formInput?.fitnessLevel?.meta?.derived ?? formInput?.fitnessLevel?.possibleAnswerId ?? "NULL"}`,
			`${formInput?.muscleSplitType?.meta?.derived ?? formInput?.muscleSplitType?.possibleAnswerId ?? "NULL"}`,
			`${formInput?.focusArea?.meta?.derived ?? formInput?.focusArea?.possibleAnswerId ?? "NULL"}`,
			`NULL`,
			`${formInput?.bodyType?.meta?.derived ?? formInput?.bodyType?.possibleAnswerId ?? "NULL"}`,
			`${formInput?.age === undefined ? "NULL" : (parseInt(formInput?.age) <= 45 ? 'EIGHTEEN_TO_FORTY_FIVE' : 'FORTY_FIVE_PLUS')}`,
			`${formInput?.workoutDays ?? "NULL"}`,
		];
		rowValues = [...rowValues, rowValues.join('_')];
		return rowValues.join(',').replace('NONE', 'NULL');
	});
	let uniquePathStrings = _.uniq(pathStrings);
	fs.writeFileSync('/Users/taponidhi/PersonalProjects/practice-node/data/all_partial_paths.csv', columnNamesString + '\n' + uniquePathStrings.join('\n'));
}

printAllPaths();