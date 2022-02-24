import * as React from "react";
import cn from "classnames";
import _ from "lodash";

import styles from "./filters.module.css";
import { FilterContext } from "../ResourceView";
import {
  AcceptFilterIcon,
  AllFiltersIcon,
  CancelFilterIcon,
  DeleteFilterIcon,
  DropFilterIcon,
} from "../../constants/icons";
import { ButtonPrimary, ButtonSimple, SecondaryButton } from "../UI/Buttons";

interface ModalFilterProps {
  showModal: boolean;
  modalFilters: any;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalFilters: React.Dispatch<React.SetStateAction<{}>>;
  clearFilter: () => void;
}

const ModalFilter: React.FC<ModalFilterProps> = (props) => {
  const { showModal, setShowModal, modalFilters, setModalFilters, clearFilter } = props;
  const context = React.useContext(FilterContext);

  const handleModalFilters = React.useCallback(() => {
    context.setFilter(modalFilters);
  }, [context, modalFilters]);

  const handleModal = React.useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  return (
    <div className={cn(styles.modalFilterBackground, showModal && styles.active)}>
      <div className={styles.modalFilter}>
        <div className={styles.modalFilterTitle}>
          Все фильтры
          <button onClick={handleModal} className={styles.closeModal}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.1884 0.816152L0.793945 11.2106M11.2067 11.1845L0.812208 0.790039"
                stroke="#000000"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div className={styles.modalFilterItems}>
          {context.filtersArray.map((el: any) => {
            return (
              <div className={styles.modalFilterItem} key={el.source}>
                <label htmlFor={el.source}>{el.title}</label>
                <el.component
                  initialValue={modalFilters ? modalFilters[el.source] : ""}
                  setModalFilters={setModalFilters}
                  source={el.source}
                />
              </div>
            );
          })}
        </div>
        <div className={styles.modalButtons}>
          <SecondaryButton
            startIcon={<CancelFilterIcon color="#005AA3" />}
            onClick={clearFilter}
            text="Clear"
          />
          <ButtonPrimary
            startIcon={<AcceptFilterIcon color="#ffffff" />}
            onClick={handleModalFilters}
            text="Accept"
          />
        </div>
      </div>
    </div>
  );
};

export const Filters: React.FC = () => {
  const context = React.useContext(FilterContext);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [modalFilters, setModalFilters] = React.useState<any>({});

  const clearFilter = React.useCallback(() => {
    setModalFilters({});
    context.setFilter({});
  }, [context]);

  return (
    <div className={styles.filtersWrapper}>
      {Object.keys(context.filter).map((source: any) => (
        <ActiveFilterItem key={source} source={source} setModalFilters={setModalFilters} />
      ))}
      <ButtonSimple
        startIcon={<AllFiltersIcon color="#005AA3" />}
        text="Все фильтры"
        color="#005AA3"
        onClick={() => setShowModal((p) => !p)}
      />
      <ButtonSimple
        text={`Сбросить (${Object.keys(context.filter).length})`}
        startIcon={<DropFilterIcon color="#D21C1C" />}
        onClick={clearFilter}
        color="#D21C1C"
      />
      <ModalFilter
        clearFilter={clearFilter}
        modalFilters={modalFilters}
        setModalFilters={setModalFilters}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
};

interface ActiveFilter {
  source: string;
  setModalFilters: React.Dispatch<React.SetStateAction<{}>>;
}

const ActiveFilterItem: React.FC<ActiveFilter> = ({ source, setModalFilters }) => {
  const context = React.useContext(FilterContext);

  const deleteActiveFilter = React.useCallback(() => {
    context.setFilter((prev: Record<string, string>) => _.omit(prev, source));
    setModalFilters((prev: Record<string, string>) => _.omit(prev, source));
  }, [context, source, setModalFilters]);

  return (
    <div className={styles.activeFilter} key={source}>
      {context.filtersArray.filter((el: any) => el.source === source)[0].title}
      <button className={styles.deleteFilterBtn} onClick={deleteActiveFilter}>
        <DeleteFilterIcon color={"#005AA3"} />
      </button>
    </div>
  );
};
