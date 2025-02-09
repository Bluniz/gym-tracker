import React, { memo } from 'react';

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
import { FlatList, Keyboard } from 'react-native';
import { Center } from '@/src/components/ui/center';
import { Text } from '@/src/components/ui/text';
import { Loading } from '@/src/components/Loading';
import { useQuery } from '@tanstack/react-query';
import { getExerciseTypes } from '@/src/services/exercises';

interface TypesFieldProps {
  selectedTypes: string[];
  setSelectedTypes: (value: string[]) => void;
}

function TypesFieldComponent({ selectedTypes, setSelectedTypes }: TypesFieldProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['exerciseTypes'],
    queryFn: getExerciseTypes,
  });

  if (isLoading) {
    return <Loading className="justify-start" />;
  }

  if (!isLoading && isError) {
    return (
      <Center>
        <Text>Desculpe, ocorreu algum problema ao recuperar os dados.</Text>
      </Center>
    );
  }

  return (
    <Accordion type="single" variant="unfilled" defaultValue={['types']}>
      <AccordionItem value="types">
        <AccordionHeader>
          <AccordionTrigger onPress={Keyboard.dismiss}>
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
        <AccordionContent className="max-h-[30rem]">
          <CheckboxGroup value={selectedTypes} onChange={setSelectedTypes}>
            <FlatList
              data={data?.data}
              keyExtractor={(item) => item.id}
              contentContainerClassName="gap-2 "
              removeClippedSubviews={true}
              getItemLayout={(data, index) => ({ length: 40, offset: 40 * index, index })}
              renderItem={({ item }) => (
                <Checkbox value={item.id}>
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

export const TypesField = memo(TypesFieldComponent);
