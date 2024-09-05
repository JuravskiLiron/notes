import { Input, Select } from "@chakra-ui/react";

export default function Filters({ filter, setFilter }) {
	return (
		<div className="flex flex-col gap-5">
			<Input
				placeholder="Поиск"
				onChange={(e) => setFilter({ ...filter, search: e.target.value })}
			/>
			<Select
				onChange={(e) => setFilter({ ...filter, sortOrder: e.target.value })}
			>
				<option value={"desc"}>Сначала новые</option>
				<option value={"asc"}>Сначала старые</option>
			</Select>
		</div>
	);
}
