library(dplyr)
library(tidyr)
unemployment_county <-
  read.table("http://www.bls.gov/lau/laucntycur14.txt", nrows = 40166, skip = 6, sep="|", colClasses = "character", strip.white = T) %>%
  select(name=4, unemployment_rate=9) %>%
  mutate(unemployment_rate = as.numeric(unemployment_rate)) %>%
  extract(name, c("county", "state"), "(.+), ([[:alpha:]]+)")

devtools::use_data(unemployment_county)
