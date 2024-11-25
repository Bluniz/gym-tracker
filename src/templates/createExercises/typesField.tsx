import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
} from '@/src/components/ui/accordion';
import { Card } from '@/src/components/ui/card';
import {
  CheckboxGroup,
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
} from '@/src/components/ui/checkbox';
import { HStack } from '@/src/components/ui/hstack';
import { ChevronUpIcon, ChevronDownIcon, CheckIcon } from 'lucide-react-native';
import { FlatList } from 'react-native';
import { Tables } from '@/database.types';
import { Spinner } from '@/src/components/ui/spinner';
import colors from 'tailwindcss/colors';
import { Center } from '@/src/components/ui/center';
import { Text } from '@/src/components/ui/text';

interface TypesFieldProps {
  types: Tables<'exercises_types'>[] | null;
  selectedTypes: string[];
  setSelectedTypes: (value: string[]) => void;
  isLoading: boolean;
  hasError: boolean;
}

export function TypesField({
  types,
  selectedTypes,
  setSelectedTypes,
  isLoading,
  hasError,
}: TypesFieldProps) {
  if (isLoading) {
    return <Spinner size="large" color={colors.red[700]} />;
  }

  if (!isLoading && hasError) {
    return (
      <Center>
        <Text>Desculpe, ocorreu algum problema ao recuperar os dados.</Text>
      </Center>
    );
  }

  return (
    <Accordion type="single" variant="unfilled">
      <AccordionItem value="types">
        <AccordionHeader>
          <AccordionTrigger>
            {({ isExpanded }) => {
              return (
                <>
                  <AccordionTitleText>Tipos</AccordionTitleText>
                  {isExpanded ? (
                    <AccordionIcon as={ChevronUpIcon} className="ml-3" />
                  ) : (
                    <AccordionIcon as={ChevronDownIcon} className="ml-3" />
                  )}
                </>
              );
            }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent className="max-h-[26rem]">
          <CheckboxGroup value={selectedTypes} onChange={setSelectedTypes}>
            <FlatList
              data={types}
              keyExtractor={(item) => item.id}
              contentContainerClassName="gap-2 "
              renderItem={({ item }) => (
                <Checkbox value={item.name}>
                  <Card variant="elevated" className="w-full rounded-xl bg-gray-700">
                    <HStack className="items-center gap-2">
                      <CheckboxIndicator>
                        <CheckboxIcon as={CheckIcon} className="text-red-700" size="lg" />
                      </CheckboxIndicator>
                      <CheckboxLabel className="text-bold text-lg text-white">
                        {item.name}
                      </CheckboxLabel>
                    </HStack>
                  </Card>
                </Checkbox>
              )}
            />
          </CheckboxGroup>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
