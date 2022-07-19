const db = require("../db/index")
const logger = require("../libs/logger")

async function getDriver(organizationId, startsAt, endsAt) {
  let response
  let query = `with driver_occuped_ as (
      select * from route as r 
      where true 
      AND r.organization_id = $$${organizationId}$$
      AND ($$${startsAt}$$ BETWEEN starts_at AND ends_at  or $$${endsAt}$$  BETWEEN starts_at AND ends_at)
      OR (  starts_at BETWEEN $$${startsAt}$$ AND $$${endsAt}$$  or ends_at  BETWEEN $$${startsAt}$$ AND $$${endsAt}$$)
    )
    select d.* from driver as d
    left join driver_occuped_ as dd
    on d.driver_id = dd.driver_id
    where dd.route_id is null
    and d.organization_id = $$${organizationId}$$`

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

exports.getDriver = getDriver
