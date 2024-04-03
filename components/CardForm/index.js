import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "@/styles";
import Logo from "@/Icons/Logo";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { FiSave } from "react-icons/fi";
import { TbArrowBack } from "react-icons/tb";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useStore from "@/store";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { enGB } from "date-fns/locale";
import { format } from "date-fns";
import { FiCalendar } from "react-icons/fi";
import TimePicker from "react-time-picker";
import { FiClock } from "react-icons/fi";

export default function CardForm({
  onCancel,
  existingActivityData,
  pageTitle,
}) {
  const router = useRouter();
  const { id } = router.query;
  const endpoint = existingActivityData
    ? `/api/activities/${id}`
    : "/api/activities";
  const method = existingActivityData ? "PUT" : "POST";
  const { mutate } = useSWR(endpoint);
  const { data: session, status } = useSession();
  const { setIsEditMode, isEditMode } = useStore();
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDayPicker, setShowDayPicker] = useState(false);

  const inputRef = useRef(null);

  const handleDayClick = (day) => {
    setSelectedDate(day);
    setShowDayPicker(false);
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSelectedDate(inputValue ? new Date(inputValue) : null);
  };

  const toggleDayPicker = () => setShowDayPicker((prev) => !prev);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const activityData = Object.fromEntries(formData);
    activityData.authorId = session.user.id;

    const response = await fetch(endpoint, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activityData),
    });
    if (response.ok) {
      mutate();
      onCancel();
      setIsEditMode(false);
      event.target.reset();
      if (isEditMode) {
        toast.success("Activity updated successfully!");
      } else {
        toast.success("Activity created successfully!");
      }
    } else {
      toast.error("Failed to save changes. Please try again.");
    }
  }

  useEffect(() => {
    if (existingActivityData) {
      inputRef.current.focus();

      const { date, category } = existingActivityData;
      setSelectedDate(date ? new Date(date) : null);
      setSelectedCategory(category || "");
    }
  }, [existingActivityData]);

  const [selectedCategory, setSelectedCategory] = useState(
    existingActivityData?.category || ""
  );

  const handleCategoryChange = (event) => {
    setSelectedCategory((prevCategory) => {
      const newCategory = event.target.value;
      if (newCategory) {
        return newCategory;
      }
    });
  };

  const textareaRef = useRef(null);

  useEffect(() => {
    adjustTextareaHeight();
  }, []);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleChange = () => {
    adjustTextareaHeight();
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getCurrentTime = () => {
    const today = new Date();
    const hours = String(today.getHours()).padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const [selectedTime, setSelectedTime] = useState(
    existingActivityData?.time || getCurrentTime()
  );

  return (
    <StyledCardForm onSubmit={handleSubmit}>
      <StyledHeadlineBox>
        <StyledLogoWrapper>
          <Logo />
        </StyledLogoWrapper>
        <StyledAppName> MeetMate</StyledAppName>
      </StyledHeadlineBox>
      {pageTitle && <StyledPageTitle>{pageTitle}</StyledPageTitle>}
      <StyledActivityNameBox category={selectedCategory}>
        <label htmlFor="name" />
        <StyledActivityNameInput
          ref={inputRef}
          type="text"
          id="name"
          name="name"
          autoComplete="off"
          minLength="3"
          maxLength="18"
          placeholder="My activity"
          defaultValue={existingActivityData?.name || ""}
          autoFocus
          required
        />
      </StyledActivityNameBox>
      <StyledInputBox>
        <StyledUpperInputBox>
          <StyledLabel htmlFor="author">Author: </StyledLabel>
          <StyledInputField
            type="text"
            id="author"
            name="author"
            autoComplete="off"
            defaultValue={existingActivityData?.author || ""}
            required
          />
          <StyledLabel htmlFor="date">Date: </StyledLabel>
          <StyledDateWrapper>
            <StyledInputField
              type="text"
              id="date"
              name="date"
              autoComplete="off"
              value={
                existingActivityData?.date
                  ? existingActivityData.date
                  : selectedDate
                  ? format(selectedDate, "yyyy-MM-dd")
                  : getCurrentDate()
              }
              readOnly
              onClick={toggleDayPicker}
              onChange={handleInputChange}
              required
            />{" "}
            <StyledFiCalendar onClick={toggleDayPicker} />
            {showDayPicker && (
              <StyledDayPicker
                onDayClick={handleDayClick}
                selected={selectedDate}
                modifiers={{ disabled: { before: new Date() } }}
                locale={enGB}
                format="yyyy-MM-dd"
                formatDate={(date) =>
                  format(date, "yyyy-MM-dd", { locale: enGB })
                }
              />
            )}
          </StyledDateWrapper>
          <StyledLabel htmlFor="time">Time: </StyledLabel>
          <StyledDateWrapper>
            <StyledTimePicker
              id="time"
              clearIcon={null}
              value={selectedTime}
              defaultValue={existingActivityData?.time || ""}
              onChange={setSelectedTime}
              disableClock
              disabled={false}
            />
            <StyledFiClock />
          </StyledDateWrapper>
          <StyledLabel htmlFor="location">Location: </StyledLabel>
          <StyledInputField
            type="text"
            id="location"
            name="location"
            autoComplete="off"
            defaultValue={existingActivityData?.location || ""}
            required
          />
          <StyledLabel htmlFor="category">Category: </StyledLabel>
          <StyledCategoryInput
            type="text"
            id="category"
            name="category"
            defaultValue={existingActivityData?.category || ""}
            onChange={handleCategoryChange}
            required
          >
            <option id="choose" name="chosoe" value="">
              --choose--
            </option>
            <option id="sports" name="sports" value="Sports">
              Sports
            </option>
            <option id="culture" name="culture" value="Culture">
              Culture
            </option>
            <option id="food" name="food" value="Food">
              Food
            </option>
            <option id="outdoor" name="outdoor" value="Outdoor">
              Outdoor
            </option>
            <option id="others" name="others" value="Others">
              Others
            </option>
          </StyledCategoryInput>
        </StyledUpperInputBox>
        <StyledDescriptionBox>
          <label htmlFor="description">Description: </label>
          <StyledTextArea
            onChange={handleChange}
            autoComplete="off"
            type="text"
            id="description"
            name="description"
            defaultValue={existingActivityData?.description || ""}
            placeholder={"Add more details..."}
          />
        </StyledDescriptionBox>
        <StyledButtonBox>
          <StyledButton type="button" onClick={onCancel}>
            <TbArrowBack size={theme.button.xs} color={theme.textColor} />
          </StyledButton>
          <StyledButton type="submit">
            <FiSave size={theme.button.xs} color={theme.textColor} />
          </StyledButton>
        </StyledButtonBox>
      </StyledInputBox>
    </StyledCardForm>
  );
}

const getCategoryColor = (category, theme) => {
  switch (category) {
    case "Sports":
      return theme.secondaryColors.sports;
    case "Culture":
      return theme.secondaryColors.culture;
    case "Food":
      return theme.secondaryColors.food;
    case "Outdoor":
      return theme.secondaryColors.outdoor;
    default:
      return theme.secondaryColors.default;
  }
};

const StyledTimePicker = styled(TimePicker)`
  display: flex;
  position: absolute;
  justify-content: start;
  align-items: center;
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.small};
  width: 8rem;
  height: 1.6rem;
  background-color: ${theme.primaryColor};
  border-bottom: ${theme.borderWidth.thin} solid rgba(0, 0, 0, 0.3);

  .react-time-picker__inputGroup__input {
    width: ${theme.button.medium} !important;
    height: 1.4rem;
    padding-top: 0;
    bottom: -0.1rem;
    background-color: rgba(239, 232, 216, 0);
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.small};
  }

  .react-time-picker__inputGroup__divider {
    font-size: larger;
  }
`;

const StyledFiClock = styled(FiClock)`
  display: flex;
  position: absolute;
  width: 1.2rem;
  height: auto;
  margin: auto;
  bottom: -0.7rem;
  padding: 0.1rem;
  padding-bottom: 0.6rem;
  right: 0;
`;

const StyledDateWrapper = styled.div`
  display: flex;
  position: relative;
`;

const StyledFiCalendar = styled(FiCalendar)`
  display: flex;
  position: absolute;
  right: 0;
  &:hover {
    stroke-width: 2.5;
  }
`;

const StyledDayPicker = styled(DayPicker)`
  display: flex;
  position: absolute;
  top: 0.15rem;
  right: -1.2rem;
  background-color: ${theme.primaryColor};
  color: ${theme.textColor};
  border: solid;
  border-width: ${theme.borderWidth.thin};
  border-radius: ${theme.borderRadius.small};
  box-shadow: ${theme.box.shadowSmall};
  padding: ${theme.spacing.small};
  width: ${theme.button.xl};
  z-index: 10;

  .rdp-caption_label {
    font-size: ${theme.fontSizes.small};
  }

  .rdp-nav_button {
    width: 0.1rem;
    height: 0.1rem;
    padding: 0.06rem;
    border-radius: ${theme.borderRadius.small};
    box-shadow: ${theme.box.shadowSmall};
    background-color: none;
  }

  .rdp-cell {
    width: auto;
    height: auto;
    padding: 0.06rem;
  }

  .rdp-day_selected {
    background-color: ${theme.confirmColor};
    color: ${theme.primaryColor};
  }

  .rdp-button_reset {
    border-radius: ${theme.borderRadius.small};
    box-shadow: none;
    width: auto;
    height: auto;
  }

  .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
    background-color: rgba(180, 201, 171, 0.5);
  }
`;

const StyledHeadlineBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: ${theme.spacing.xs};

  width: ${theme.box.width};
`;

const StyledLogoWrapper = styled.div`
  width: ${theme.button.xs};
  height: ${theme.button.xs};
`;

const StyledAppName = styled.h1`
  font-size: ${theme.fontSizes.small};
  margin: 0;
  padding-top: 0.3rem;
`;

const StyledPageTitle = styled.h1`
  font-size: ${theme.fontSizes.ml};
  margin: ${theme.spacing.small};
`;

const StyledCardForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  margin-top: ${theme.spacing.small};
  width: ${theme.box.width};
  justify-content: space-evenly;
`;

const StyledActivityNameBox = styled.div`
  display: flex;
  border-style: solid;
  border-radius: ${theme.borderRadius.medium};
  border-width: ${theme.borderWidth.medium};
  box-shadow: ${theme.box.shadow};
  width: ${theme.box.width};
  height: ${theme.box.height};
  background-color: ${({ category }) => getCategoryColor(category, theme)};
`;

const StyledActivityNameInput = styled.input`
  display: inline-block;
  margin: auto;
  width: 95%;
  height: 90%;
  background-color: transparent;
  border: none;
  color: ${theme.textColor};
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.large};
  text-align: center;
  padding-top: ${theme.spacing.medium};
  padding-bottom: ${theme.spacing.medium};
  &::placeholder {
    opacity: 0.9;
    border-bottom: ${theme.borderWidth.thin} solid rgba(0, 0, 0, 0.3);
  }
`;

const StyledButton = styled.button`
  height: ${theme.button.medium};
  width: ${theme.button.medium};
`;

const StyledInputBox = styled.div`
  margin: auto;
  margin-top: ${theme.spacing.medium};
  padding: ${theme.spacing.large};
  padding-bottom: ${theme.spacing.medium};
  border-style: solid;
  border-radius: ${theme.borderRadius.medium};
  border-width: ${theme.borderWidth.medium};
  box-shadow: ${theme.box.shadow};
  width: ${theme.box.width};
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.small};
`;

const StyledUpperInputBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, max-content);
  gap: ${theme.spacing.medium};
`;

const StyledLabel = styled.label`
  display: flex;
  justify-content: end;
  width: 5.5rem;
`;

const StyledInputField = styled.input`
  display: flex;
  justify-content: start;
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.small};
  width: 8rem;
  background-color: ${theme.primaryColor};
  border: none;
  border-bottom: ${theme.borderWidth.thin} solid rgba(0, 0, 0, 0.3);
`;

const StyledCategoryInput = styled.select`
  width: 8rem;
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.small};
  text-align: center;
  background-color: ${theme.primaryColor};
  border: none;
  border: ${theme.borderWidth.thin} solid ${theme.textColor};
  border-radius: ${theme.borderRadius.small};
  border-width: ${theme.borderWidth.medium};
  box-shadow: ${theme.box.shadowSmall};
`;

const StyledDescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${theme.spacing.medium};
  gap: ${theme.spacing.small};
`;

const StyledTextArea = styled.textarea`
  resize: none;
  overflow: hidden;
  height: auto;
  min-height: ${theme.box.height};
  font-family: ${theme.fonts.text};
  font-size: ${theme.fontSizes.small};
  padding: ${theme.spacing.small};
  border: ${theme.borderWidth.thin} solid ${theme.textColor};
  border-radius: ${theme.borderRadius.small};
  border-width: ${theme.borderWidth.medium};
  box-shadow: ${theme.box.shadowSmall};
  background-color: ${theme.primaryColor};
  &::placeholder {
    font-family: ${theme.fonts.text};
    font-size: ${theme.fontSizes.small};
    opacity: 0.5;
  }
`;
const StyledButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${theme.spacing.medium};
  gap: 1rem;
`;
