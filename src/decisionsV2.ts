let fitnessExperience: { possibleAnswerId?: string, meta?: { derived?: string } };

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
		} else if (goal.possibleAnswerId === 'GAIN MUSCLE') {
			's-focus-area-3';
		} else if (goal.possibleAnswerId === 'GET SHREDDED' || goal.possibleAnswerId === 'POWER LIFTING') {
			'd-muscle-split-type'
		} else {
			's-focus-area-1';
		}
	`);
	// d-muscle-split-type
	eval(`
		if ((typeof fitnessLevel === 'undefined' || fitnessLevel === undefined || fitnessLevel.possibleAnswerId === undefined || fitnessLevel.possibleAnswerId === 'NOVICE') && (goal.possibleAnswerId === 'LOSE WEIGHT' || goal.possibleAnswerId === 'GAIN MUSCLE')) {
			's-muscle-split-type-5';
		} else if (parseInt(age) > 45 || goal.possibleAnswerId === 'TONE UP' || goal.possibleAnswerId === 'MARATHON') {
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
	// d-workout-days
	eval(`
		if (parseInt(age) > 45 || (goal.possibleAnswerId === 'TONE UP' || goal.possibleAnswerId === 'MARATHON') && (typeof muscleSplitType !== 'undefined' && muscleSplitType !== undefined && muscleSplitType.possibleAnswerId !== undefined && muscleSplitType.possibleAnswerId === 'PUSH_PULL_LEGS')) {
			's-workout-days-2';
		} else if (typeof muscleSplitType !== 'undefined' && muscleSplitType !== undefined && muscleSplitType.possibleAnswerId !== undefined && (((goal.possibleAnswerId === 'GAIN MUSCLE' || goal.possibleAnswerId === 'LOSE WEIGHT') && muscleSplitType.possibleAnswerId === 'PUSH_PULL_LEGS') || (goal.possibleAnswerId === 'GET SHREDDED' && muscleSplitType.possibleAnswerId === 'SINGLE'))) {
			's-workout-days-1';
		} else if (typeof muscleSplitType !== 'undefined' && muscleSplitType !== undefined && muscleSplitType.possibleAnswerId !== undefined && (muscleSplitType.possibleAnswerId === 'SINGLE' || (goal.possibleAnswerId === 'GET SHREDDED' && muscleSplitType.possibleAnswerId === 'MULTI'))) {
			's-workout-days-3';
		} else if (goal.possibleAnswerId === 'POWER LIFTING' || (goal.possibleAnswerId === 'LOSE WEIGHT' && typeof muscleSplitType !== 'undefined' && muscleSplitType !== undefined && muscleSplitType.possibleAnswerId !== undefined && muscleSplitType.possibleAnswerId === 'UPPER_LOWER')) {
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

export default decisions;