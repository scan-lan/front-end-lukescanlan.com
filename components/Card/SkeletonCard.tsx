import Card from "."
import React from "react"

const SkeletonCard = () => (
  <Card
    cover={null}
    title=""
    description=""
    category=""
    date=""
    topics={[""]}
    slug=""
    dummyCard={true}
  />
)

export default SkeletonCard
