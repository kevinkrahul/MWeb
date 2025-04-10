"use client";

import DynamicForm from "@/components/form/DynamicForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import useCategories from "@/app/admin/Actions/useCategories";
import useFaq from "@/app/admin/Actions/useFaq";
import useCustomer from "@/app/admin/Actions/useCustomer";
import useImage from "@/app/admin/Actions/useImage";
import useDateEvent from "@/app/admin/Actions/useDateEvent";
import { useEditing } from "@/app/admin/Actions/editingHook";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { logout } from "@/app/login/actions";

export default function CrudForm() {
  const {
    categories,
    categoryLoading,
    handleCategorySubmit,
    // handleDeleteCategory,
    categorySchema,
  } = useCategories();
  const { faqSchema, faqs, handleDeleteFaq, handleFaqSubmit, faqloading } =
    useFaq();
  const { customer, handleDeleteCustomer } = useCustomer();
  const {
    imageLoading,
    image,
    setFile,
    file,
    handleDeleteImage,
    setCatid,
    message,
    catid,
    handleImageSubmit,
  } = useImage();
  const {
    dateLoading,
    dateSchema,
    dateEvents,
    handleDateSubmit,
    handleDeleteDateEvent,
  } = useDateEvent();

  const { editingItem, setEditingItem } = useEditing();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoggingOut(true); // Set loading state
    await logout(); // Perform logout
    setIsLoggingOut(false); // Reset loading state (not always needed, as redirect likely happens)
  }

  return (
    <>
      {/* FAQ */}
      <div>
        <div className="flex justify-center items-center p-4">
          <form onSubmit={handleLogout}>
            <Button
              type="submit"
              variant="outline"
              className="hover:bg-red-400 dark:hover:bg-red-400 dark:bg-neutral-500"
              onClick={() => logout()}
            >
              {isLoggingOut ? "Logging Out..." : "Logout"}
            </Button>
          </form>
        </div>
        <div className="flex flex-col gap-4 bg-pink-50 dark:bg-neutral-900 items-center p-4">
          <h1 className="text-xl font-bold mb-4">
            {editingItem?.type === "faq" ? "Edit FAQ" : "Create FAQ"}
          </h1>
          <DynamicForm
            key={editingItem?.id || "new"}
            schema={faqSchema}
            defaultValues={
              editingItem?.type === "faq"
                ? {
                    question: editingItem.data.questions,
                    answer: editingItem.data.answers,
                  }
                : { question: "", answer: "" }
            }
            fields={[
              {
                name: "question",
                label: "Question",
                placeholder: "Enter your question",
              },
              {
                name: "answer",
                label: "Answer",
                placeholder: "Enter your answer",
              },
            ]}
            submitHandler={handleFaqSubmit}
            loading={faqloading}
            editing={editingItem?.type === "faq"}
          />
        </div>
        {/* Display FAQ */}
        <div className="p-3">
          <h1 className="text-xl font-bold mb-4 flex justify-center">FAQ's</h1>
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="flex flex-col gap-3 justify-between p-4 border"
            >
              <div className="flex flex-col gap-2 w-[80%]">
                <span>{faq.questions}</span>
                <span>-{faq.answers}</span>
              </div>
              <div className="flex gap-3">
                <Button
                  type="submit"
                  variant="outline"
                  onClick={() =>
                    setEditingItem({ id: faq.id, type: "faq", data: faq })
                  }
                >
                  Update
                </Button>
                <Button
                  type="submit"
                  variant="outline"
                  onClick={() => handleDeleteFaq(faq.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Category */}
      <div className="my-3">
        <div className="flex flex-col gap-4 bg-pink-50 dark:bg-neutral-900 items-center p-4">
          <h1 className="text-xl font-bold mb-4">Edit Category Name</h1>
          <DynamicForm
            key={editingItem?.id || "new"}
            schema={categorySchema}
            defaultValues={
              editingItem?.type === "category"
                ? { name: editingItem.data.name }
                : { name: "" }
            }
            fields={[
              {
                name: "name",
                label: "Category",
                placeholder: "Create a new category",
              },
            ]}
            submitHandler={handleCategorySubmit}
            loading={categoryLoading}
            editing={editingItem?.type === "category"}
          />
        </div>
        {/* Display Category */}
        <div className="p-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col justify-between p-4 gap-3 border"
            >
              <span>{category.name}</span>
              <div>
                <Button
                  type="submit"
                  variant="outline"
                  onClick={() =>
                    setEditingItem({
                      id: category.id,
                      type: "category",
                      data: category,
                    })
                  }
                >
                  Update
                </Button>
                {/* <Button
                  type="submit"
                  variant="outline"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  Delete
                </Button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Date */}
      <div>
        <div className="flex flex-col gap-4 bg-pink-50 dark:bg-neutral-900 items-center p-4">
          <h1 className="text-xl font-bold mb-4">
            {editingItem?.type === "dateEvent"
              ? "Edit DateEvent"
              : "Create DateEvent"}
          </h1>
          <DynamicForm
            key={editingItem?.id || "new"}
            schema={dateSchema}
            defaultValues={
              editingItem?.type === "dateEvent"
                ? {
                    date: editingItem.data.date
                      ? new Date(editingItem.data.date)
                          .toISOString()
                          .split("T")[0]
                      : new Date().toISOString().split("T")[0],
                    eventname: editingItem.data.eventname,
                    notes: editingItem.data.notes,
                  }
                : {
                    date: new Date().toISOString().split("T")[0],
                    eventname: "",
                    notes: "",
                  }
            }
            fields={[
              {
                name: "date",
                label: "Pick a Date",
                placeholder: "Select the date",
                type: "date",
              },
              {
                name: "eventname",
                label: "Eventname",
                placeholder: "Enter the eventname",
              },
              {
                name: "notes",
                label: "Notes",
                placeholder: "Enter the Summery of the event",
              },
            ]}
            submitHandler={handleDateSubmit}
            loading={dateLoading}
            editing={editingItem?.type === "dateEvent"}
          />
        </div>
        {/* Display DateEvent */}
        <div className="p-3">
          {dateEvents.map((event) => (
            <div
              key={event.id}
              className="flex flex-col justify-between p-4 gap-3 border"
            >
              <div className="flex flex-col gap-2 w-[80%]">
                <span>
                  {new Date(event.date).toLocaleDateString()} -{" "}
                  {event.eventname}
                </span>
                <span>{event.notes}</span>
              </div>
              <div className="flex gap-3">
                <Button
                  type="submit"
                  variant={"outline"}
                  onClick={() =>
                    setEditingItem({
                      id: event.id,
                      type: "dateEvent",
                      data: event,
                    })
                  }
                >
                  Update
                </Button>
                <Button
                  type="submit"
                  variant={"outline"}
                  onClick={() => handleDeleteDateEvent(event.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Reply */}
      <div className="p-3 my-3">
        <div className="flex justify-center">
          <h1 className="text-xl font-bold mb-4">Delete Customer review</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3">
          {customer.length > 0 ? (
            customer.map((customer) => (
              <div
                key={customer.id}
                className="flex flex-col gap-2 justify-between p-2 border"
              >
                <h3>{customer.name}</h3>
                <span>{customer.email}</span>
                <p>{customer.comments}</p>
                <Button
                  type="submit"
                  variant="outline"
                  onClick={() => handleDeleteCustomer(customer.id)}
                >
                  Delete
                </Button>
              </div>
            ))
          ) : (
            <h3>No customer review found!!</h3>
          )}
        </div>
      </div>

      {/* Image */}
      <div className="flex flex-col gap-4 bg-pink-50 dark:bg-neutral-900 items-center p-4">
        <h1 className="text-xl font-bold mb-4">Upload Image</h1>
        {message && <p className="text-pink-500">{message}</p>}
        <form
          onSubmit={handleImageSubmit}
          className="space-y-4 flex flex-col items-start justify-center px-6 pb-5"
        >
          {/* File Input */}
          <div className="flex flex-col gap-3">
            <label className="block text-sm font-medium">Choose a Image</label>
            <div className="relative border-2 group border-dashed rounded-lg px-8 border-gray-400 bg-white dark:bg-black dark:hover:bg-gray-200 hover:bg-gray-300 flex flex-col items-center transition justify-center w-full h-10 cursor-pointer">
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const selectedFile = Array.from(e.target.files || []);
                  setFile(selectedFile);
                }}
                className="absolute w-full h-full inset-0 opacity-0 cursor-pointer"
              />
              <span className="text-sm text-gray-500 dark:text-white group-hover:text-gray-950 ">
                {file.length > 0 ? (
                  <span className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Selected
                  </span>
                ) : (
                  "Click to upload image"
                )}
              </span>
            </div>
            <div className=" flex w-[95%] md:w-[80%] flex-col gap-2">
              {file.length > 0 && (
                <>
                  <label className="block text-sm font-medium">
                    Selected Files : {file.length}
                  </label>
                  <span>
                    {file.map((f, index) => (
                      <span key={index} className="text-green-700">
                        {f.name} /{" "}
                      </span>
                    ))}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="flex flex-col gap-3">
            <label className="block text-sm font-medium">Select Category</label>
            <select
              value={catid}
              onChange={(e) => setCatid(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2  md:text-sm"
            >
              <option value="">Choose a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <Button type="submit" variant="outline">
            {imageLoading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>

      {/* Image Display */}
      {/* <div className="flex flex-col gap-4"> */}
      <div className="flex flex-col justify-center items-center">
        {categories.map((cat) => (
          <div className="flex flex-col items-center gap-4 my-5" key={cat.id}>
            <h1 className="text-xl font-bold mb-4">{cat.name}</h1>
            <Carousel
              opts={{
                align: "start",
              }}
              className=" max-w-6xl w-[70vw]"
            >
              <CarouselContent>
                {image
                  .filter((img) => img.catid === cat.id)
                  .map((img) => (
                    <CarouselItem
                      key={img.id}
                      className="md:basis-1/2 lg:basis-1/3"
                    >
                      <div className="flex flex-col items-center aspect-auto min-h-[15em] md:min-h-[16em] justify-center gap-2 p-2 border ">
                        <Image
                          src={
                            img.url.startsWith("http") ? img.url : `/${img.url}`
                          }
                          width={900}
                          height={1200}
                          alt="uploded"
                          className="w-auto h-auto object-contain"
                        />
                        <Button
                          type="submit"
                          variant={"outline"}
                          onClick={() => handleDeleteImage(img.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <CarouselNext />
              <CarouselPrevious />
            </Carousel>
            <div className="block text-center mt-2">
              Total Images: {image.filter((img) => img.catid === cat.id).length}
            </div>
          </div>
        ))}
      </div>
      {/* </div> */}
    </>
  );
}
