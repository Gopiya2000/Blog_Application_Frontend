const profileReducer = (profiles = [], action) => {
    switch (action.type) {
        case "VIEW_PROFILE":
            return action.profiles
        case "GET_ALL_PROFILE":
            console.log("Entering get all profile",action.profiles)
            return action.profiles
        case "ADD_PROFILE":
            return [action.profiles.data, ...profiles]
        case "UPDATE_PROFILES":
            return profiles.map((profile) =>
                profile._id === action.profiles.data._id ? action.profiles.data : profiles)
        case "DELETE_PROFILES":
            return profiles.filter((profile) =>
                profile._id !== action.id)
        default:
            console.log("Entering default:")
            return profiles
    }
}

export default profileReducer; 
