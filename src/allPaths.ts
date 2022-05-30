import _ from 'lodash';
import fs from 'fs';

type GenderInput = {
	possibleAnswerId?: 'MALE' | 'FEMALE' | 'OTHER';
	meta?: {
		derived?: 'MALE' | 'FEMALE';
	}
};

type AgeInput = {
	possibleAnswerId?: 'EIGHTEEN_TO_FORTY_FIVE' | 'FORTY_FIVE_PLUS';
	meta?: {
		derived?: 'EIGHTEEN_TO_FORTY_FIVE' | 'FORTY_FIVE_PLUS';
	}
};

type BodyTypeInput = {
	possibleAnswerId?: 'LEAN' | 'ATHLETIC' | 'AVERAGE' | 'OVERWEIGHT' | 'OBESE';
	meta?: {
		derived?: 'LEAN' | 'ATHLETIC' | 'AVERAGE' | 'OVERWEIGHT' | 'OBESE';
	}
};

type FitnessLevelInput = {
	possibleAnswerId?: 'NOVICE' | 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
	meta?: {
		derived?: 'NOVICE' | 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
	}
};

type GoalInput = {
	possibleAnswerId?: 'LOSE WEIGHT' | 'GAIN MUSCLE' | 'STAY FIT' | 'BODY RECOMP' | 'GET SHREDDED' | 'MARATHON' | 'POWER LIFTING' | 'TONE UP';
	meta?: {
		derived?: 'LOSE WEIGHT' | 'GAIN MUSCLE' | 'STAY FIT' | 'BODY RECOMP' | 'GET SHREDDED' | 'MARATHON' | 'POWER LIFTING';
	}
};

type FocusAreaInput = {
	possibleAnswerId?: 'NONE' | 'BELLY_AND_HIP_FAT' | 'BELLY_FAT' | 'LOWER_BODY' | 'ABS_OBLIQUES' | 'ABT';
	meta?: {
		derived?: 'NONE' | 'ABT';
	}
};

type MuscleSplitTypeInput = {
	possibleAnswerId?: 'SINGLE' | 'MULTI' | 'PUSH_PULL_LEGS' | 'UPPER_LOWER';
	meta?: {
		derived?: 'SINGLE' | 'MULTI' | 'PUSH_PULL_LEGS' | 'UPPER_LOWER';
	}
};

type WorkoutDaysInput = {
	possibleAnswerId?: '3' | '4' | '5' | '6'
};

type ResultPaceInput = {
	possibleAnswerId?: 'I_WILL_TAKE_MY_TIME' | 'HEALTHY' | 'TAKE_IT_UP_A_NOTCH';
	meta?: {
		derived?: 'I_WILL_TAKE_MY_TIME' | 'HEALTHY' | 'TAKE_IT_UP_A_NOTCH';
	}
};

type ProblemAreaInput = {
	possibleAnswerId?: 'HIP_AND_LOWER_BACK_AND_BACK_AND_NECK' | 'SHOULDERS' | 'KNEE' | 'ASTHMA_HYPERTENSION_THYROID' | 'NONE';
	meta?: {
		derived?: 'HIP_AND_LOWER_BACK_AND_BACK_AND_NECK' | 'SHOULDERS' | 'KNEE' | 'ASTHMA_HYPERTENSION_THYROID' | 'NONE';
	}
};

interface FormInput {
	genderInput?: GenderInput;
	ageInput?: AgeInput;
	bodyTypeInput?: BodyTypeInput;
	fitnessLevelInput?: FitnessLevelInput;
	goalInput?: GoalInput;
	focusAreaInput?: FocusAreaInput;
	muscleSplitTypeInput?: MuscleSplitTypeInput;
	workoutDaysInput?: WorkoutDaysInput;
	resultPaceInput?: ResultPaceInput;
	problemAreaInput?: ProblemAreaInput;
}

function calculateAllPaths() {
	const formInputs: FormInput[] = [];
	let possibleGenderInputs: GenderInput[] = [
		{possibleAnswerId: 'MALE', meta: {derived: 'MALE'}},
		{possibleAnswerId: 'FEMALE', meta: {derived: 'FEMALE'}},
		{possibleAnswerId: 'OTHER', meta: {derived: 'MALE'}}
	];
	for (const curGenderInput of possibleGenderInputs) {
		let possibleAgeInputs: AgeInput[] = [
			{possibleAnswerId: 'EIGHTEEN_TO_FORTY_FIVE', meta: {derived: 'EIGHTEEN_TO_FORTY_FIVE'}},
			{possibleAnswerId: 'FORTY_FIVE_PLUS', meta: {derived: 'FORTY_FIVE_PLUS'}}
		];
		for (const curAgeInput of possibleAgeInputs) {
			let possibleBodyTypeInputs: BodyTypeInput[] = [
				{possibleAnswerId: 'LEAN', meta: {derived: 'LEAN'}},
				{possibleAnswerId: 'ATHLETIC', meta: {derived: 'ATHLETIC'}},
				{possibleAnswerId: 'AVERAGE', meta: {derived: 'AVERAGE'}},
				{possibleAnswerId: 'OVERWEIGHT', meta: {derived: 'OVERWEIGHT'}},
				{possibleAnswerId: 'OBESE', meta: {derived: 'OBESE'}},
			];
			for (const curBodyTypeInput of possibleBodyTypeInputs) {
				let possibleFitnessLevelInputs: FitnessLevelInput[] = [
					{possibleAnswerId: "NOVICE", meta: {derived: 'NOVICE'}},
					{possibleAnswerId: "BEGINNER", meta: {derived: 'BEGINNER'}},
					{possibleAnswerId: "INTERMEDIATE", meta: {derived: 'INTERMEDIATE'}},
					{possibleAnswerId: "ADVANCED", meta: {derived: 'ADVANCED'}},
				];
				for (const curFitnessLevelInput of possibleFitnessLevelInputs) {
					let possibleGoalInputs: GoalInput[] = [];
					if (curAgeInput?.meta?.derived === 'EIGHTEEN_TO_FORTY_FIVE' && curFitnessLevelInput?.meta?.derived === 'NOVICE') {
						possibleGoalInputs = [
							{possibleAnswerId: 'LOSE WEIGHT', meta: {derived: 'LOSE WEIGHT'}},
							{possibleAnswerId: 'TONE UP', meta: {derived: 'STAY FIT'}},
							{possibleAnswerId: 'GAIN MUSCLE', meta: {derived: 'GAIN MUSCLE'}},
							{possibleAnswerId: 'STAY FIT', meta: {derived: 'STAY FIT'}},
						];
					} else if (curAgeInput?.meta?.derived === 'EIGHTEEN_TO_FORTY_FIVE' && (curFitnessLevelInput?.meta?.derived === 'BEGINNER' || curFitnessLevelInput?.meta?.derived === 'INTERMEDIATE') && curGenderInput?.meta?.derived === 'MALE') {
						possibleGoalInputs = [
							{possibleAnswerId: 'LOSE WEIGHT', meta: {derived: 'LOSE WEIGHT'}},
							{possibleAnswerId: 'TONE UP', meta: {derived: 'BODY RECOMP'}},
							{possibleAnswerId: 'GAIN MUSCLE', meta: {derived: 'GAIN MUSCLE'}},
							{possibleAnswerId: 'STAY FIT', meta: {derived: 'STAY FIT'}},
							{possibleAnswerId: 'MARATHON', meta: {derived: 'MARATHON'}}
						];
					} else if (curAgeInput?.meta?.derived === 'EIGHTEEN_TO_FORTY_FIVE' && (curFitnessLevelInput?.meta?.derived === 'BEGINNER' || curFitnessLevelInput?.meta?.derived === 'INTERMEDIATE') && curGenderInput?.meta?.derived === 'FEMALE') {
						possibleGoalInputs = [
							{possibleAnswerId: 'LOSE WEIGHT', meta: {derived: 'LOSE WEIGHT'}},
							{possibleAnswerId: 'TONE UP', meta: {derived: 'BODY RECOMP'}},
							{possibleAnswerId: 'GAIN MUSCLE', meta: {derived: 'GAIN MUSCLE'}},
							{possibleAnswerId: 'STAY FIT', meta: {derived: 'STAY FIT'}},
							{possibleAnswerId: 'MARATHON', meta: {derived: 'MARATHON'}}
						];
					} else if (curAgeInput?.meta?.derived === 'EIGHTEEN_TO_FORTY_FIVE' && curFitnessLevelInput?.meta?.derived === 'ADVANCED') {
						possibleGoalInputs = [
							{possibleAnswerId: 'LOSE WEIGHT', meta: {derived: 'LOSE WEIGHT'}},
							{possibleAnswerId: 'GET SHREDDED', meta: {derived: 'GET SHREDDED'}},
							{possibleAnswerId: 'GAIN MUSCLE', meta: {derived: 'GAIN MUSCLE'}},
							{possibleAnswerId: 'STAY FIT', meta: {derived: 'STAY FIT'}},
							{possibleAnswerId: 'MARATHON', meta: {derived: 'MARATHON'}},
							{possibleAnswerId: 'POWER LIFTING', meta: {derived: 'POWER LIFTING'}}
						];
					} else if (curAgeInput?.meta?.derived === 'FORTY_FIVE_PLUS' && (curFitnessLevelInput?.meta?.derived === 'NOVICE' || curFitnessLevelInput?.meta?.derived === 'INTERMEDIATE' || curFitnessLevelInput?.meta?.derived === 'ADVANCED')) {
						possibleGoalInputs = [
							{possibleAnswerId: 'STAY FIT', meta: {derived: 'STAY FIT'}},
							{possibleAnswerId: 'LOSE WEIGHT', meta: {derived: 'LOSE WEIGHT'}},
							{possibleAnswerId: 'GAIN MUSCLE', meta: {derived: 'GAIN MUSCLE'}},
						];
					} else if (curAgeInput?.meta?.derived === 'FORTY_FIVE_PLUS' && curFitnessLevelInput?.meta?.derived === 'ADVANCED') {
						possibleGoalInputs = [
							{possibleAnswerId: 'STAY FIT', meta: {derived: 'STAY FIT'}},
							{possibleAnswerId: 'LOSE WEIGHT', meta: {derived: 'LOSE WEIGHT'}},
							{possibleAnswerId: 'GAIN MUSCLE', meta: {derived: 'GAIN MUSCLE'}},
							{possibleAnswerId: 'MARATHON', meta: {derived: 'MARATHON'}},
						];
					}
					for (const curGoalInput of possibleGoalInputs) {
						let possibleFocusAreaInputs: FocusAreaInput[] = [];
						if (curGoalInput?.possibleAnswerId === 'GET SHREDDED' || curGoalInput?.possibleAnswerId === 'POWER LIFTING') {
							possibleFocusAreaInputs = [
								{possibleAnswerId: 'NONE', meta: {derived: 'NONE'}},
							];
						} else {
							possibleFocusAreaInputs = [
								{possibleAnswerId: 'NONE', meta: {derived: 'NONE'}},
								{possibleAnswerId: 'ABT', meta: {derived: 'ABT'}},
							];
						}
						for (const curFocusAreaInput of possibleFocusAreaInputs) {
							let possibleMuscleSplitTypeInputs: MuscleSplitTypeInput[] = [];
							if (curGoalInput?.possibleAnswerId === 'GAIN MUSCLE') {
								possibleMuscleSplitTypeInputs = [
									{possibleAnswerId: 'SINGLE', meta: {derived: 'SINGLE'}},
									{possibleAnswerId: 'MULTI', meta: {derived: 'MULTI'}},
									{possibleAnswerId: 'PUSH_PULL_LEGS', meta: {derived: 'PUSH_PULL_LEGS'}}
								];
							} else if (curGoalInput?.possibleAnswerId === 'LOSE WEIGHT') {
								possibleMuscleSplitTypeInputs = [
									{possibleAnswerId: 'SINGLE', meta: {derived: 'SINGLE'}},
									{possibleAnswerId: 'MULTI', meta: {derived: 'MULTI'}},
									{possibleAnswerId: 'PUSH_PULL_LEGS', meta: {derived: 'PUSH_PULL_LEGS'}},
									{possibleAnswerId: 'UPPER_LOWER', meta: {derived: 'UPPER_LOWER'}},
								];
							} else if (curGoalInput?.possibleAnswerId === "STAY FIT" || curGoalInput?.possibleAnswerId === "POWER LIFTING") {
								possibleMuscleSplitTypeInputs = [
									{possibleAnswerId: 'UPPER_LOWER', meta: {derived: 'UPPER_LOWER'}},
								];
							} else if (curGoalInput?.possibleAnswerId === 'TONE UP' || curGoalInput?.possibleAnswerId === 'MARATHON') {
								possibleMuscleSplitTypeInputs = [
									{possibleAnswerId: 'SINGLE', meta: {derived: 'SINGLE'}},
									{possibleAnswerId: 'MULTI', meta: {derived: 'MULTI'}},
									{possibleAnswerId: 'PUSH_PULL_LEGS', meta: {derived: 'PUSH_PULL_LEGS'}}
								];
							} else if (curGoalInput?.possibleAnswerId === 'GET SHREDDED') {
								possibleMuscleSplitTypeInputs = [
									{possibleAnswerId: 'SINGLE', meta: {derived: 'SINGLE'}},
									{possibleAnswerId: 'MULTI', meta: {derived: 'MULTI'}},
								];
							}else{
								break;
							}
							for (const curMuscleSplitTypeInput of possibleMuscleSplitTypeInputs) {
								let possibleWorkoutDaysInputs: WorkoutDaysInput[] = [];
								if ((curGoalInput?.possibleAnswerId === 'GAIN MUSCLE' || curGoalInput?.possibleAnswerId === 'LOSE WEIGHT') && curMuscleSplitTypeInput?.meta?.derived === 'PUSH_PULL_LEGS') {
									possibleWorkoutDaysInputs = [
										{possibleAnswerId: '6'}
									];
								} else if ((curGoalInput?.possibleAnswerId === 'TONE UP' || curGoalInput?.possibleAnswerId === 'MARATHON') && curMuscleSplitTypeInput?.meta?.derived === 'PUSH_PULL_LEGS') {
									possibleWorkoutDaysInputs = [
										{possibleAnswerId: '3'},
										{possibleAnswerId: '4'},
										{possibleAnswerId: '6'},
									];
								} else if (curMuscleSplitTypeInput?.meta?.derived === 'SINGLE') {
									possibleWorkoutDaysInputs = [
										{possibleAnswerId: '5'},
										{possibleAnswerId: '6'},
									];
								} else if (curGoalInput?.possibleAnswerId === 'POWER LIFTING') {
									possibleWorkoutDaysInputs = [
										{possibleAnswerId: '3'},
										{possibleAnswerId: '4'},
									];
								} else {
									possibleWorkoutDaysInputs = [
										{possibleAnswerId: '3'},
										{possibleAnswerId: '4'},
										{possibleAnswerId: '5'},
										{possibleAnswerId: '6'},
									];
								}
								for (const curWorkoutDaysInput of possibleWorkoutDaysInputs) {
									const formInput: FormInput = {
										genderInput: _.cloneDeep(curGenderInput),
										ageInput: _.cloneDeep(curAgeInput),
										bodyTypeInput: _.cloneDeep(curBodyTypeInput),
										fitnessLevelInput: _.cloneDeep(curFitnessLevelInput),
										goalInput: _.cloneDeep(curGoalInput),
										focusAreaInput: _.cloneDeep(curFocusAreaInput),
										muscleSplitTypeInput: _.cloneDeep(curMuscleSplitTypeInput),
										workoutDaysInput: _.cloneDeep(curWorkoutDaysInput),
									};
									formInputs.push(formInput);
								}
							}
						}
					}
				}
			}
		}
	}
	printAllPaths(formInputs);
}

function printAllPaths(formInputs: FormInput[]) {
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
	const pathStrings = formInputs.map(formInput => {
		let rowValues = [
			`${formInput?.genderInput?.meta?.derived  ?? "NULL"}`,
			`${formInput?.goalInput?.meta?.derived ?? "NULL"}`,
			`${formInput?.fitnessLevelInput?.meta?.derived  ?? "NULL"}`,
			`${formInput?.muscleSplitTypeInput?.meta?.derived  ?? "NULL"}`,
			`${formInput?.focusAreaInput?.meta?.derived  ?? "NULL"}`,
			`${formInput?.problemAreaInput?.meta?.derived  ?? "NULL"}`,
			`${formInput?.bodyTypeInput?.meta?.derived  ?? "NULL"}`,
			`${formInput?.ageInput?.meta?.derived  ?? "NULL"}`,
			`${formInput?.workoutDaysInput?.possibleAnswerId ?? "NULL"}`,
		];
		rowValues = [...rowValues, rowValues.join('_')];
		return rowValues.join(',').replace('NONE', 'NULL');
	});
	let uniquePathStrings = _.uniq(pathStrings);
	fs.writeFileSync('/Users/taponidhi/PersonalProjects/practice-node/data/all_paths.csv', columnNamesString + '\n' + uniquePathStrings.join('\n'));
}

calculateAllPaths();