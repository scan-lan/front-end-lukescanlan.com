import React from "react";
import Link from "next/link";
import Image from "./Image";
import Article from "../types/Article";

const Card = ({ article }: { article: Article }) => {
  return (
    <Link as={`/article/${article.attributes.slug}`} href="/article/[id]">
      <a className="uk-link-reset">
        <div className="uk-card uk-card-muted">
          <div className="uk-card-media-top">
            <Image image={article.attributes.cover} />
          </div>
          <div className="uk-card-body">
            <p id="category" className="uk-text-uppercase">
              {article.attributes.category.data.attributes.name}
            </p>
            <p id="title" className="uk-text-large">
              {article.attributes.title}
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Card;
