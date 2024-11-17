"use client"
import React from "react";
import Image from "next/image";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {motion} from "framer-motion";

export default function Marketing() {
  const router = useRouter();

  const handleStartLearning = async () => {
    try {
      await router.push('/courses');
    } catch (error) {
      console.error("Ошибка при переходе на страницу курсов:", error);
    }
  };
  
  return (
    <div className="mx-auto flex-1 w-full flex flex-col lg:flex-row items-center max-w-[988px] p-4 gap-2">
      <div className="relative w-[240px] h-[240px] lg:w-[988px] lg:h-[424px] mb-32 lg:mb-16 lg:flex lg:justify-center lg:items-center">
        <div>
          <div className="grid grid-rows-4 grid-flow-col gap-4">
            <div className="mx-auto grid grid-cols-2 grid-flow-col gap-4">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Image
                  src={"/Planes/planeGreen1.png"}
                  alt="зеленый самолет"
                  width={70}
                  height={70}
                  style={{ width: 'auto', height: 'auto' }}
                />
              </motion.div>
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Image
                  src={"/Planes/planeRed1.png"}
                  alt="красный самолет"
                  width={70}
                  height={70}
                  style={{ width: 'auto', height: 'auto' }}
                />
              </motion.div>
            </div>
            <div className="grid grid-cols-1 grid-flow-col gap-4">
              <div className="flex justify-center">
                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.6,
                    type: "spring",
                    stiffness: 260,
                    damping: 20 
                  }}
                >
                  <Image
                    src={"/Planes/medalSilver.png"}
                    alt="медаль"
                    width={70}
                    height={70}
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </motion.div>
              </div>
            </div>
            <div className="mx-auto grid grid-cols-2 grid-flow-col gap-4">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <Image
                  src={"/Planes/planeYellow1.png"}
                  alt="желтый самолет"
                  width={70}
                  height={70}
                  style={{ width: 'auto', height: 'auto' }}
                />
              </motion.div>
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                <Image
                  src={"/Planes/planeBlue1.png"}
                  alt="синий самолет"
                  width={70}
                  height={70}
                  style={{ width: 'auto', height: 'auto' }}
                />
              </motion.div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-8 items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="text-xl font-bold text-neutral-600 max-w-[488px] text-center"
          >
            Изучайте языки, урок за уроком: Ваш путь к глобальному общению начинается здесь.
          </motion.h1>
          <ClerkLoading>
            <Loader />  
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
                <SignUpButton mode="modal" signInFallbackRedirectUrl={"/courses"} signInForceRedirectUrl={"/courses"}>
                  <Button variant="default"
                    onClick={() => window.location.href = '/courses'}>
                    Начать обучение
                  </Button>
                </SignUpButton>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.6 }}
              >
                <SignInButton>
                  <Button variant={"outline"}>У меня уже есть аккаунт</Button>
                </SignInButton>
              </motion.div>
            </SignedOut>
            <SignedIn>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
                <Button asChild
                  onClick={() => console.log("Clicking continue learning")}
                >
                  <Link href="/courses" onClick={() => console.log("Clicking link")}>
                    Продолжить обучение
                  </Link>
                </Button>
              </motion.div>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
}