import { createElement as h, Fragment, useEffect } from 'react'

import {
  REFERRERS_SORTING_TOP,
  REFERRERS_SORTING_RECENT
} from '../../../../constants/referrers'

import enhanceReferrers from '../../utils/enhanceReferrers'

import CardReferrers from '../cards/CardReferrers'
import Select from '../Select'

const RouteReferrers = (props) => {
  useEffect(() => {
    props.fetchDomains(props)
  }, [])

  useEffect(() => {
    props.domains.value.map((domain) => {
      props.fetchReferrers(props, domain.data.id)
    })
  }, [ props.domains.value, props.referrers.sorting ])

  return (
    h(Fragment, {},

      h('div', { className: 'subHeader' },
        h(Select, {
          value: props.referrers.sorting,
          onChange: (e) => props.setReferrersSorting(e.target.value),
          items: [
            { value: REFERRERS_SORTING_TOP, label: 'Top referrers' },
            { value: REFERRERS_SORTING_RECENT, label: 'Recent referrers' }
          ]
        })
      ),

      props.domains.value.map(
        (domain) => (
          h(CardReferrers, {
            key: domain.data.id,
            headline: domain.data.title,
            items: props.referrers.value[domain.data.id] == null ? [] : enhanceReferrers(props.referrers.value[domain.data.id].value)
          })
        )
      )

    )
  )
}

export default RouteReferrers
