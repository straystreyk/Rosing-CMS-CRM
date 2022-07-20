import * as React from "react";
import { EditInputComponent } from "../../FastEditInput";
import { InputProps } from "../../input-types";
import { ArrayInputWithDifferentFieldsOrigin } from "./index";
import { SeriesAndMoviesQuickFilterInputs } from "../../../../containers/PagesAndAttributes/Filters/Filter/QuikFiltersModels/series-and-movies-quick-filter";
import { AudioShowsQuickFilterInputs } from "../../../../containers/PagesAndAttributes/Filters/Filter/QuikFiltersModels/audio-shows-quick-filter";
import { HighlightsQuickFilterInputs } from "../../../../containers/PagesAndAttributes/Filters/Filter/QuikFiltersModels/highlights-quick-filter";
import { ChannelsQuickFilterInputs } from "../../../../containers/PagesAndAttributes/Filters/Filter/QuikFiltersModels/channels-quick-filter";
import { MatchesQuickFilterInputs } from "../../../../containers/PagesAndAttributes/Filters/Filter/QuikFiltersModels/matches-quick-filters";
import { NewsQuickFilterInputs } from "../../../../containers/PagesAndAttributes/Filters/Filter/QuikFiltersModels/news-quick-filter";
import { QuickFilterWrapperShow } from "./views/quick-filter-wrapper-show";

export const ShowView: React.FC<InputProps> = ({ source, resource }) => {
  switch (source) {
    case "moviesFilters":
    case "seriesFilters":
      return (
        <QuickFilterWrapperShow
          label="Series"
          component={SeriesAndMoviesQuickFilterInputs}
          resource={resource}
          source={source}
        />
      );
    case "audioShowsFilters":
      return (
        <QuickFilterWrapperShow
          label="Audio shows"
          component={AudioShowsQuickFilterInputs}
          resource={resource}
          source={source}
        />
      );
    case "highlightsFilters":
      return (
        <QuickFilterWrapperShow
          label="Highlights"
          component={HighlightsQuickFilterInputs}
          resource={resource}
          source={source}
        />
      );
    case "channelsFilters":
      return (
        <QuickFilterWrapperShow
          label="Channels"
          component={ChannelsQuickFilterInputs}
          resource={resource}
          source={source}
        />
      );
    case "matchesFilters":
      return (
        <QuickFilterWrapperShow
          label="Matches"
          component={MatchesQuickFilterInputs}
          resource={resource}
          source={source}
        />
      );
    case "newsFilters":
      return (
        <QuickFilterWrapperShow
          label="News"
          component={NewsQuickFilterInputs}
          resource={resource}
          source={source}
        />
      );
  }

  return <div>ниче нет</div>;
};

export const ArrayInputWithDifferentFieldsShow = (props: InputProps) => {
  return (
    <EditInputComponent
      ComponentInput={ArrayInputWithDifferentFieldsOrigin}
      ComponentShow={ShowView}
      borderOff
      {...props}
    />
  );
};
