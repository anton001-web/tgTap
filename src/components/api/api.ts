export const BASE_API_URL = 'https://cat-backend.pro/v1'

interface AuthT  {
    tgId: any,
    tgName: any,
    languageCode: any,
    username: any,
    isPremium: any,
    kentId: string | undefined | null,
}   

export const getUser = async (authToken:string) => {
    try {
        const response = await fetch(`${BASE_API_URL}/auth/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Authorization": `Token ${authToken}`
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          return errorData
        } else {
          const responseData = await response.json();
          return responseData
        }
      } catch (error) {
        return error
      }
}

export const userAuth = async ({tgId, tgName, languageCode, username, isPremium, kentId}:AuthT) => {

    console.log(tgId, tgName, languageCode, username, isPremium)

    try {
      const response = await fetch(`${BASE_API_URL}/auth/authenticate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify({
          tg_id: tgId,
          tg_name: tgName,
          language_code: languageCode,
          username: username,
          is_premium: isPremium || false,
          referred_by_code: kentId || ''
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return errorData
      } else {
        const responseData = await response.json();
        return responseData
      }
    } catch (error) {
      return error
    }
};

export const getTable = async (authToken:string) => {

  try {
      const response = await fetch(`${BASE_API_URL}/games/mines-start`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          'Authorization': `Token ${authToken}`
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        return errorData
      } else {
        const responseData = await response.json();
        return responseData
      }
    } catch (error) {
      return error
    }
}

export const getTasks = async (authToken:string) => {

  try {
      const response = await fetch(`${BASE_API_URL}/tasks/available-tasks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          'Authorization': `Token ${authToken}`
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        return errorData
      } else {
        const responseData = await response.json();
        return responseData
      }
    } catch (error) {
      return error
    }
}

export const getReferral = async (authToken:string) => {

  try {
      const response = await fetch(`${BASE_API_URL}/points/referral-data`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          'Authorization': `Token ${authToken}`
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        return errorData
      } else {
        const responseData = await response.json();
        return responseData
      }
    } catch (error) {
      return error
    }
}

export const getPointsPerSec = async (authToken:string) => {

  try {
      const response = await fetch(`${BASE_API_URL}/points/mining`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          'Authorization': `Token ${authToken}`
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        return errorData
      } else {
        const responseData = await response.json();
        return responseData
      }
    } catch (error) {
      return error
    }
}

export const claimPoints = async (authToken:string) => {

  try {
      const response = await fetch(`${BASE_API_URL}/points/mining`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          'Authorization': `Token ${authToken}`
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        return errorData
      } else {
        const responseData = await response.json();
        return responseData
      }
    } catch (error) {
      return error
    }
}


export const sendPoints = async (authToken:string, qty:number, isBombed:boolean) => {

  try {
      const response = await fetch(`${BASE_API_URL}/games/mines-start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          'Authorization': `Token ${authToken}`
        },
        body: JSON.stringify({
          right_answers_amount: qty,
          is_bombed: isBombed
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return errorData
      } else {
        const responseData = await response.json();
        return responseData
      }
    } catch (error) {
      return error
    }
}

export const closeTask = async (authToken:string, taskId: number) => {

  try {
      const response = await fetch(`${BASE_API_URL}/tasks/comeplete-task/${taskId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          'Authorization': `Token ${authToken}`
        },
        // body: JSON.stringify({
        //   task_id : taskId,
        // }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return errorData
      } else {
        const responseData = await response.json();
        return responseData
      }
    } catch (error) {
      return error
    }
}