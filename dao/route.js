const db = require("../db/index")
const logger = require("../libs/logger")

async function getRoute(organizationId, driverId) {
  let response
  let query = `SELECT r.organization_id, 
	r.vehicle_id, 
	r.driver_id, 
  r.name,
	to_char(r.starts_at::time, 'HH:MI') as starts_at,
	to_char(r.ends_at::time, 'HH:MI') as ends_at,
  split_part(travel_time::varchar,':', 1) || 'H ' || split_part(travel_time::varchar,':', 2) ||'M' as travel_time,
	r.total_stops, 
	v.plate,
	d.name as driver_name,
	d.last_name,
	a.name as action_name,
	s.name as status_name,
	r.action_id, 
	r.status_id,
  r.route_id
	FROM public.route as r
	left join vehicle as v
	on v.vehicle_id = r.vehicle_id
	left join driver as d
	on d.driver_id = r.driver_id
	left join "action" as a
	on a.action_id = r.action_id
	join status as s
	on s.status_id = r.status_id
  where true `

  if (organizationId && organizationId !== "Todos") {
    query += ` and r.organization_id = $$${organizationId}$$`
  }

  if (driverId) {
    query += ` and r.driver_id = $$${driverId}$$`
  }

  query += ` order by r.created_at asc;`
  try {
    response = await db.query(query)
    if (response && response.length) {
      return response
    }
    return []
  } catch (error) {
    logger.error(error)
    return null
  }
}

async function createRoute(body) {
  let { name, startsAt, endsAt, totalStops, action, driver, vehicle, organizationSelected } = body
  let response
  let query = `INSERT INTO public.route(
    organization_id,
    vehicle_id,
    driver_id, 
    starts_at, 
    ends_at,
    travel_time, 
    total_stops,
    action_id,
    status_id,
    name)
  VALUES (
    $$${organizationSelected}$$,
    ${vehicle ? `$$${vehicle}$$` : null},
    ${driver ? `$$${driver}$$` : null},
    $$${startsAt}$$,
    $$${endsAt}$$,
    $$${endsAt}$$::time- $$${startsAt}$$::time,
    ${totalStops},
    $$${action}$$,
    $$492b8283-b3b5-46ea-8e52-768045b13e9e$$,
    $$${name}$$
  )
  returning name`

  try {
    response = await db.query(query)
    if (response && response.length) {
      return response
    }
    return []
  } catch (error) {
    logger.error(error)
    return null
  }
}

async function deleteRoute(routeId) {
  let response
  let query = `delete from route where route_id = $$${routeId}$$
  returning route_id
  `
  try {
    response = await db.query(query)
    if (response && response.length) {
      return response
    }
    return []
  } catch (error) {
    logger.error(error)
    return null
  }
}

async function updateRoute(body) {
  let { name, startsAt, endsAt, totalStops, action, driver, vehicle, route_id } = body
  let response
  let query = `UPDATE public.route
    SET vehicle_id = $$${vehicle}$$,
    driver_id = $$${driver}$$,
    starts_at = $$${startsAt}$$,
    ends_at = $$${endsAt}$$,
    travel_time = $$${endsAt}$$::time- $$${startsAt}$$::time,
    total_stops = ${totalStops},
    action_id = $$${action}$$,
    name= $$${name}$$
    WHERE route_id= $$${route_id}$$
    returning uuid_generate_v4()`

  try {
    response = await db.query(query)
    if (response && response.length) {
      return response
    }
    return []
  } catch (error) {
    logger.error(error)
    return null
  }
}

exports.getRoute = getRoute
exports.createRoute = createRoute
exports.deleteRoute = deleteRoute
exports.updateRoute = updateRoute
