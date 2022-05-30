import fs from 'fs';

type Gender = 'MALE' | 'FEMALE';
type Age = string;
type Weight = string;
type Height = string;
type BodyType = 'LEAN' | 'ATHLETIC' | 'AVERAGE' | 'OVERWEIGHT' | 'OBESE';
type FitnessExperience = 'NEW_TO_FITNESS' | 'COMING_AFTER_BREAK' | 'SOMEWHAT_ACTIVE';
type FitnessLevel = 'NOVICE' | 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
type Goal =
	'LOSE WEIGHT'
	| 'GAIN MUSCLE'
	| 'STAY FIT'
	| 'BODY RECOMP'
	| 'GET SHREDDED'
	| 'MARATHON'
	| 'POWER LIFTING'
	| 'TONE UP'
	| 'IMPROVE SPORTS PERFORMANCE';
type FocusArea = 'NONE' | 'BELLY_AND_HIP_FAT' | 'BELLY_FAT' | 'LOWER_BODY' | 'ABS_OBLIQUES' | 'ABT';
type MuscleSplitType = 'SINGLE' | 'MULTI' | 'PUSH_PULL_LEGS';
type WorkoutDays = '3' | '4' | '5' | '6';
type ResultPace = 'I_WILL_TAKE_MY_TIME' | 'HEALTHY' | 'TAKE_IT_UP_A_NOTCH';
type ProblemArea =
	'HIP_AND_LOWER_BACK_AND_BACK_AND_NECK'
	| 'SHOULDERS'
	| 'KNEE'
	| 'ASTHMA_HYPERTENSION_THYROID'
	| 'NONE';
type ViewPlan = 'SAFE' | 'REVIEW_NEEDED';

interface FormInputs {
	gender: Gender;
	age: Age;
	weight: Weight;
	height: Height;
	bodyType: BodyType;
	fitnessExperience: FitnessExperience;
	// d-fitness-level
	fitnessLevel: FitnessLevel;
	// d-goal
	goal: Goal;
	// d-focus-area
	focusArea: FocusArea;
	// d-muscle-split-type
	muscleSplitType: MuscleSplitType;
	// d-workout-days
	workoutDays: WorkoutDays;
	// d-result-pace
	resultPace: ResultPace;
	// d-problem-area
	problemArea: ProblemArea;
	// d-view
	viewPlan: ViewPlan;
}

const findAllPossibleCombinations = () => {
	const formInputs: FormInputs = {} as FormInputs;
	const possibleGenders: Gender[] = ['MALE', 'FEMALE'];
	for (const gender of possibleGenders) {
		formInputs.gender = gender;
		const possibleAges: Age[] = ['30', '60'];
		for (const age of possibleAges) {
			formInputs.age = age;
			const possibleBodyTypes: BodyType[] = ['LEAN', 'ATHLETIC', 'AVERAGE', 'OVERWEIGHT', 'OBESE'];
			for (const bodyType of possibleBodyTypes) {
				formInputs.bodyType = bodyType;
				const possibleFitnessExperiences: FitnessExperience[] = ['NEW_TO_FITNESS', 'COMING_AFTER_BREAK', 'SOMEWHAT_ACTIVE'];
				for (const fitnessExperience of possibleFitnessExperiences) {
					formInputs.fitnessExperience = fitnessExperience;
					decisionFitnessLevel(formInputs);
				}
			}
		}
	}
};


const decisionFitnessLevel = (formInputs: FormInputs) => {
	let possibleFitnessLevels: FitnessLevel[] = [];
	const {fitnessExperience} = formInputs;
	if (fitnessExperience === 'NEW_TO_FITNESS') {
		possibleFitnessLevels = ['NOVICE'];
	} else {
		possibleFitnessLevels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];
	}
	for (const possibleFitnessLevel of possibleFitnessLevels) {
		formInputs.fitnessLevel = possibleFitnessLevel;
		decisionGoal(formInputs);
	}
};

const decisionGoal = (formInputs: FormInputs) => {
	let possibleGoals: Goal[] = [];
	const {age, fitnessLevel, gender} = formInputs;
	if (parseInt(age) <= 45 && (fitnessLevel === 'NOVICE' || fitnessLevel === undefined)) {
		possibleGoals = ['LOSE WEIGHT', 'STAY FIT', 'GAIN MUSCLE'];
	} else if (parseInt(age) <= 45 && (fitnessLevel === 'BEGINNER' || fitnessLevel === 'INTERMEDIATE') && gender === 'MALE') {
		possibleGoals = ['LOSE WEIGHT', 'BODY RECOMP', 'GAIN MUSCLE', 'STAY FIT', 'MARATHON'];
	} else if (parseInt(age) <= 45 && (fitnessLevel === 'BEGINNER' || fitnessLevel === 'INTERMEDIATE') && gender === 'FEMALE') {
		possibleGoals = ['LOSE WEIGHT', 'BODY RECOMP', 'GAIN MUSCLE', 'STAY FIT', 'MARATHON'];
	} else if (parseInt(age) <= 45 && fitnessLevel === 'ADVANCED') {
		possibleGoals = ['LOSE WEIGHT', 'GET SHREDDED', 'GAIN MUSCLE', 'STAY FIT', 'MARATHON', 'POWER LIFTING'];
	} else if (parseInt(age) > 45 && (fitnessLevel === 'NOVICE' || fitnessLevel === 'BEGINNER' || fitnessLevel === 'INTERMEDIATE')) {
		possibleGoals = ['STAY FIT', 'LOSE WEIGHT', 'GAIN MUSCLE'];
	} else if (parseInt(age) > 45 && fitnessLevel === 'ADVANCED') {
		possibleGoals = ['STAY FIT', 'LOSE WEIGHT', 'GAIN MUSCLE', 'MARATHON'];
	}

	for (const possibleGoal of possibleGoals) {
		formInputs.goal = possibleGoal;
		decisionFocusArea(formInputs);
	}
};

const decisionFocusArea = (formInputs: FormInputs) => {
	let possibleFocusAreas: FocusArea[] = [];
	const {bodyType, goal} = formInputs;
	if ((bodyType === 'OVERWEIGHT' || bodyType === 'OBESE') && (goal === 'LOSE WEIGHT' || goal === 'TONE UP' || goal === 'STAY FIT')) {
		possibleFocusAreas = ['NONE', 'BELLY_AND_HIP_FAT'];
	} else if ((bodyType === 'LEAN' || bodyType === 'ATHLETIC' || bodyType === 'AVERAGE') && (goal === 'LOSE WEIGHT' || goal === 'TONE UP' || goal === 'STAY FIT')) {
		possibleFocusAreas = ['NONE', 'BELLY_FAT', 'LOWER_BODY'];
	} else if (goal === 'GAIN MUSCLE' || goal === 'GET SHREDDED' || goal === 'POWER LIFTING') {
		possibleFocusAreas = ['NONE', 'ABS_OBLIQUES', 'LOWER_BODY'];
	}

	for (const possibleFocusArea of possibleFocusAreas) {
		formInputs.focusArea = possibleFocusArea;
		decisionMuscleSplitType(formInputs);
	}
};

const decisionMuscleSplitType = (formInputs: FormInputs) => {
	let possibleMuscleSplitTypes: MuscleSplitType[] = [];
	const {goal} = formInputs;
	if (goal === 'GAIN MUSCLE') {
		possibleMuscleSplitTypes = ['SINGLE', 'MULTI', 'PUSH_PULL_LEGS'];
	} else if (goal === 'LOSE WEIGHT') {
		possibleMuscleSplitTypes = ['SINGLE', 'MULTI', 'PUSH_PULL_LEGS'];
	} else if (goal === 'TONE UP' || goal === 'IMPROVE SPORTS PERFORMANCE') {
		possibleMuscleSplitTypes = ['SINGLE', 'MULTI', 'PUSH_PULL_LEGS'];
	} else if (goal === 'GET SHREDDED') {
		possibleMuscleSplitTypes = ['SINGLE', 'MULTI'];
	} else {
		possibleMuscleSplitTypes = ['MULTI'];
	}
	for (const possibleMuscleSplitType of possibleMuscleSplitTypes) {
		formInputs.muscleSplitType = possibleMuscleSplitType;
		decisionWorkoutDays(formInputs);
	}
};

const decisionWorkoutDays = (formInputs: FormInputs) => {
	let possibleWorkoutDays: WorkoutDays[];
	const {muscleSplitType, goal} = formInputs;
	if ((goal === 'GAIN MUSCLE' || goal === 'LOSE WEIGHT') && muscleSplitType === 'PUSH_PULL_LEGS') {
		possibleWorkoutDays = ['6'];
	} else if ((goal === 'STAY FIT' || goal === 'MARATHON') && muscleSplitType === 'PUSH_PULL_LEGS') {
		possibleWorkoutDays = ['3', '4', '6'];
	} else if ((goal === 'GAIN MUSCLE' || goal === 'LOSE WEIGHT') && muscleSplitType === 'SINGLE') {
		possibleWorkoutDays = ['5', '6'];
	} else if (goal === 'POWER LIFTING') {
		possibleWorkoutDays = ['3', '4'];
	} else {
		possibleWorkoutDays = ['3', '4', '5', '6'];
	}

	for (const possibleWorkoutDay of possibleWorkoutDays) {
		formInputs.workoutDays = possibleWorkoutDay;
		decisionResultPace(formInputs);
	}
};


const decisionResultPace = (formInputs: FormInputs) => {
	let possibleResultPaces: ResultPace[] = ['HEALTHY'];
	const {goal} = formInputs;
	if (goal === 'GAIN MUSCLE') {
		possibleResultPaces = ['HEALTHY', 'TAKE_IT_UP_A_NOTCH'];
	} else if (goal === 'LOSE WEIGHT') {
		possibleResultPaces = ['I_WILL_TAKE_MY_TIME', 'HEALTHY', 'TAKE_IT_UP_A_NOTCH'];
	}
	for (const resultPace of possibleResultPaces) {
		formInputs.resultPace = resultPace;
		decisionProblemArea(formInputs);
	}
};

const decisionProblemArea = (formInputs: FormInputs) => {
	const {goal} = formInputs;
	if (goal === 'POWER LIFTING' || goal === 'GET SHREDDED') {
		formInputs.problemArea = 'NONE';
		decisionViewPlan(formInputs);
	} else {
		const possibleProblemAreas: ProblemArea[] = ['NONE', 'HIP_AND_LOWER_BACK_AND_BACK_AND_NECK', 'KNEE', 'SHOULDERS', 'ASTHMA_HYPERTENSION_THYROID'];
		for (const problemArea of possibleProblemAreas) {
			formInputs.problemArea = problemArea;
			decisionViewPlan(formInputs);
		}
	}
};

const decisionViewPlan = (formInputs: FormInputs) => {
	const {problemArea} = formInputs;
	if (problemArea === 'NONE') {
		formInputs.viewPlan = 'SAFE';
	} else {
		formInputs.viewPlan = 'REVIEW_NEEDED';
	}
	printPath(formInputs);
};

const printPath = (formInputs: FormInputs) => {
	const pathParams = [
		formInputs.gender,
		formInputs.age === '30' ? '18-45' : '45+',
		formInputs.bodyType,
		formInputs.fitnessExperience,
		formInputs.fitnessLevel,
		formInputs.goal,
		formInputs.focusArea === 'NONE' ? 'NONE' : 'ABT',
		formInputs.muscleSplitType,
		formInputs.workoutDays,
		formInputs.problemArea
	];
	const pathString = pathParams.join(',');
	if (!st.has(pathString)) {
		st.add(pathString);
		allPaths.push(pathString);
	}
};

const st = new Set<string>();
const allPaths: string[] = [];

findAllPossibleCombinations();
const columnsString = [
	'Gender',
	'Age',
	'Body Type',
	'Fitness Experience',
	'Fitness Level',
	'Goal',
	'Focus Area',
	'Muscle Split Type',
	'Workout Days',
	'Problem Area'
].join(',');
fs.writeFileSync('/Users/taponidhi/PersonalProjects/practice-node/data/paths.csv', columnsString + '\n' + allPaths.join('\n'));
console.log(allPaths.length);

const decisions = () => {
	// d-fitness-level
	eval(`
		if (fitnessExperience.possibleAnswerId === 'NEW_TO_FITNESS') {
			'd-goal';
		} else {
			's-fitness-level';
		}
	`);

	// d-goal
	eval(`
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
	// d-focus-area
	eval(`
		if ((bodyType.possibleAnswerId === 'OVERWEIGHT' || bodyType.possibleAnswerId === 'OBESE') && (goal.possibleAnswerId === 'LOSE WEIGHT' || goal.possibleAnswerId === 'TONE UP' || goal.possibleAnswerId === 'STAY FIT')) {
			's-focus-area-1';
		} else if ((bodyType.possibleAnswerId === 'LEAN' || bodyType.possibleAnswerId === 'ATHLETIC' || bodyType.possibleAnswerId === 'AVERAGE') && (goal.possibleAnswerId === 'LOSE WEIGHT' || goal.possibleAnswerId === 'TONE UP' || goal.possibleAnswerId === 'STAY FIT')) {
			's-focus-area-2';
		} else if (goal.possibleAnswerId === 'GAIN MUSCLE' || goal.possibleAnswerId === 'POWER LIFTING') {
			's-focus-area-3';
		} else if (goal.possibleAnswerId === 'GET SHREDDED') {
			'd-muscle-split-type'
		} else {
			's-focus-area-1';
		}
	`);
	// d-muscle-split-type
	eval(`
		if (goal.possibleAnswerId === 'GAIN MUSCLE') {
			's-muscle-split-type-1';
		} else if (goal.possibleAnswerId === 'LOSE WEIGHT') {
			's-muscle-split-type-2';
		} else if (goal.possibleAnswerId === 'TONE UP' || goal.possibleAnswerId === 'MARATHON') {
			's-muscle-split-type-3';
		} else if (goal.possibleAnswerId === 'GET SHREDDED') {
			's-muscle-split-type-4';
		} else {
			'd-workout-days';
		}
	`);
	// d-workout-days
	eval(`
		if ((goal.possibleAnswerId === 'GAIN MUSCLE' || goal.possibleAnswerId === 'LOSE WEIGHT') && (typeof muscleSplitType !== 'undefined' && muscleSplitType !== undefined && muscleSplitType.possibleAnswerId !== undefined && muscleSplitType.possibleAnswerId === 'PUSH_PULL_LEGS')) {
			's-workout-days-1';
		} else if ((goal.possibleAnswerId === 'TONE UP' || goal.possibleAnswerId === 'MARATHON') && (typeof muscleSplitType !== 'undefined' && muscleSplitType !== undefined && muscleSplitType.possibleAnswerId !== undefined && muscleSplitType.possibleAnswerId === 'PUSH_PULL_LEGS')) {
			's-workout-days-2';
		} else if (typeof muscleSplitType !== 'undefined' && muscleSplitType !== undefined && muscleSplitType.possibleAnswerId !== undefined && muscleSplitType.possibleAnswerId === 'SINGLE') {
			's-workout-days-3';
		} else if (goal.possibleAnswerId === 'POWER LIFTING') {
			's-workout-days-4';
		} else {
			's-workout-days-5';
		}
	`);
	// d-result-pace
	eval(`
		if (goal.possibleAnswerId === 'LOSE WEIGHT') {
			's-result-pace-1';
		} else if (goal.possibleAnswerId === 'GAIN MUSCLE') {
			's-result-pace-2';
		} else {
			'd-problem-area';
		}
	`);
	// d-problem-area
	eval(`
		if (goal.possibleAnswerId === 'POWER LIFTING' || goal.possibleAnswerId === 'GET SHREDDED') {
			'd-view-plan';
		} else {
			's-problem-area';
		}
	`);
	// d-view-plan
	eval(`
		if (typeof problemArea === 'undefined' || problemArea === undefined || problemArea.possibleAnswerId === undefined || problemArea.possibleAnswerId === 'NONE' || (problemArea.meta !== undefined && problemArea.meta.derived === 'NONE')) {
			's-view-plan-1';
		} else {
			's-view-plan-2';
		}
	`);
};