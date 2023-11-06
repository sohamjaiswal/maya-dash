import { error } from "@sveltejs/kit"
import type { StaffRecord, StaffResRec } from '$lib/types/maya';

export const load = async() => {
  const getStaffData = async() => {
    const staffData = await fetch(`https://api.mayabot.xyz/staff`, {
      method: 'GET'
    })
    if (!staffData.ok) {
      throw error(500, 'Internal Server Error')
    }
    const {staff, devs, managers}: {staff: StaffRecord, devs: StaffRecord, managers: StaffRecord} = (await staffData.json()).data as StaffResRec
    return {staff, devs, managers}
  }
  return {
    lazy: {
      staffData: getStaffData()
    }
  }
}