"use client";
import Modal from "@/components/ui/Modal";
import BookingForm from "./BookingForm";
import { ServiceData } from "@/types";
export default function BookingModal({
  services,
  selected,
  onClose,
}: {
  services: ServiceData[];
  selected: string;
  onClose: () => void;
}) {
  return (
    <Modal title="Reserve seu momento" onClose={onClose}>
      <BookingForm services={services} selected={selected} />
    </Modal>
  );
}
