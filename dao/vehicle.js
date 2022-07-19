const db = require("../db/index")
const logger = require("../libs/logger")

async function getVehicle(organizationId, startsAt, endsAt) {
  let response
  let query = ` 
  with vehicle_occuped_ as (
    select * from route as r 
    where true 
    AND r.organization_id = $$${organizationId}$$
    AND ($$${startsAt}$$ BETWEEN starts_at AND ends_at  or $$${endsAt}$$  BETWEEN starts_at AND ends_at)
    OR (  starts_at BETWEEN $$${startsAt}$$ AND $$${endsAt}$$  or ends_at  BETWEEN $$${startsAt}$$ AND $$${endsAt}$$)
  )
  select v.* from vehicle as v
  left join vehicle_occuped_ as dd
  on v.vehicle_id = dd.vehicle_id
  where dd.route_id is null
  and v.organization_id = $$${organizationId}$$`

  try {
    response = await db.query(query)
    if (response && response.length) {
      return response
    }
    return null
  } catch (error) {
    logger.error(error)
    return null
  }
}

exports.getVehicle = getVehicle
