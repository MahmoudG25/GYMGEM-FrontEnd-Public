/**
 * Maps category IDs to category names
 * @param {number} categoryId - The category ID (1-15)
 * @returns {string} The category name
 */
export const getCategoryName = (categoryId) => {
    const categoryMap = {
        1: "Strength Training",
        2: "Cardio & Endurance",
        3: "Flexibility & Mobility",
        4: "Bodyweight Only",
        5: "Yoga",
        6: "Pilates",
        7: "Recovery & Prehab",
        8: "Meditation & Breathwork",
        9: "Beginner's Journey",
        10: "Fat Loss & Toning",
        11: "Build Muscle Mass",
        12: "Prenatal & Postnatal",
        13: "Dance Fitness",
        14: "Sport-Specific Training",
        15: "Equipment Specific",
    };

    return categoryMap[categoryId] || "Other";
};

/**
 * Maps category names to category IDs
 * @param {string} categoryName - The category name
 * @returns {number} The category ID
 */
export const getCategoryId = (categoryName) => {
    const reverseMap = {
        "Strength Training": 1,
        "Cardio & Endurance": 2,
        "Flexibility & Mobility": 3,
        "Bodyweight Only": 4,
        "Yoga": 5,
        "Pilates": 6,
        "Recovery & Prehab": 7,
        "Meditation & Breathwork": 8,
        "Beginner's Journey": 9,
        "Fat Loss & Toning": 10,
        "Build Muscle Mass": 11,
        "Prenatal & Postnatal": 12,
        "Dance Fitness": 13,
        "Sport-Specific Training": 14,
        "Equipment Specific": 15,
    };

    return reverseMap[categoryName] || 1;
};
