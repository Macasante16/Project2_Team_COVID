SELECT date, admin2, province_state, confirmed, deaths, recovered, active FROM `bigquery-public-data.covid19_jhu_csse.summary`
where admin2 is not null and admin2 <> "O'Brien" and admin2 <> "Prince George's" and admin2 <> "Queen Anne's" and admin2 <> "St. Mary's" and admin2 <> "Unassigned" 
and fips is not null
and province_state = "Arizona"
and date >= "2020-06-15"
and date <= "2020-06-16"